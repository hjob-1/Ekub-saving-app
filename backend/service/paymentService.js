const dayjs = require('dayjs');
const Payment = require('../models/Payment');
const SavingPlan = require('../models/SavingPlan');
const { sendEmail } = require('./emailService');
const User = require('../models/User');
const sendResponse = require('./responseUtil');

const generatePayments = async (savingPlan) => {
  const payments = [];
  let currentDate = getNextDueDate(
    dayjs(savingPlan.startDate),
    savingPlan.paymentPlan,
  ); // Calculate first due date
  const endDate = dayjs(savingPlan.endDate);

  try {
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
      createPaymentsForParticipants(savingPlan, currentDate, payments);
      currentDate = getNextDueDate(currentDate, savingPlan.paymentPlan); // Move to the next payment date
    }

    // Save all payments to the database
    await Payment.insertMany(payments);
  } catch (err) {
    console.log(err);
  }
};

// Helper function to get the next due date based on payment plan
const getNextDueDate = (currentDate, paymentPlan) => {
  switch (paymentPlan) {
    case 'weekly':
      return currentDate.add(1, 'week');
    case 'biweekly':
      return currentDate.add(2, 'week');
    case 'monthly':
      return currentDate.add(1, 'month');
    default:
      return currentDate; // In case of an unknown payment plan
  }
};

// Helper function to create payments for all participants
const createPaymentsForParticipants = (savingPlan, currentDate, payments) => {
  savingPlan.participants.forEach((user) => {
    payments.push(
      new Payment({
        savingPlan: savingPlan._id,
        user,
        amount: savingPlan.amount,
        isPaid: false,
        dueDate: currentDate.toDate(),
      }),
    );

    console.log(`Payment generated for user: ${user}`);
    console.log(`Due Date: ${currentDate.format('YYYY-MM-DD')}`);
  });
};

// Function to conduct a lottery based on payment plan frequency
const conductLottery = async (
  res,
  savingPlanId,
  isManual = false,
  roundDate,
) => {
  try {
    const savingPlan = await SavingPlan.findById(savingPlanId).populate(
      'participants',
    );
    if (!savingPlan) {
      throw new Error('Saving Plan not found');
    }
    const lastLotteryDate = dayjs(
      savingPlan.lastLotteryDate || savingPlan.startDate,
    );

    // Fetch users who have paid for the current period
    const paidUsers = await Payment.find({
      savingPlan: savingPlanId,
      isPaid: true,
      dueDate: {
        $lte: new Date(roundDate),
        $gte: lastLotteryDate.toDate(),
      },
    }).populate('user');
    console.log('round date', new Date(roundDate));
    console.log('padi users', paidUsers);

    if (paidUsers.length === 0) {
      return sendResponse(
        res,
        400,
        'No participants have paid for this period.',
      );
    }

    // Get previous winners
    const previousWinners = savingPlan.winners.map((winner) => winner.email);
    const paidUsersEmail = paidUsers.map((user) => user.user.email);
    // Filter out previous winners
    const eligibleUsers = await User.find({
      email: { $in: paidUsersEmail, $nin: previousWinners },
    });

    if (eligibleUsers.length === 0) {
      return sendResponse(
        res,
        400,
        'No eligible participants left to win the lottery.',
      );
    }

    // Select a random winner
    const randomIndex = Math.floor(Math.random() * eligibleUsers.length);
    const winner = eligibleUsers[randomIndex];

    // Save winner to the database
    savingPlan.winners.push({ email: winner.email });
    savingPlan.lastLotteryDate = roundDate;
    await savingPlan.save();

    console.log(`Winner: ${winner.email}`);

    // Send notification email
    const allUsers = await User.find();
    await sendEmail({
      winner,
      participants: savingPlan.participants,
      type: 'lottery',
    });
  } catch (error) {
    console.error(error.message);
    return sendResponse(res, 500, 'Server error');
  }
};

module.exports = {
  generatePayments,
  conductLottery,
};
