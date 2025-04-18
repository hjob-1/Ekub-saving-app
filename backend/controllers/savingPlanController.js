const dayjs = require('dayjs');
const Payment = require('../models/Payment');
const SavingPlan = require('../models/SavingPlan');
const logger = require('../service/logger');
const sendResponse = require('../service/responseUtil');
const { generatePayments } = require('../service/paymentService');
const { getEndDate } = require('../util');
const User = require('../models/User');

const startSavingPlanController = async (req, res) => {
  const { name, participants, startDate, amount, ekubId, paymentPlan } =
    req.body;

  try {
    const endDate = getEndDate(startDate, paymentPlan, participants.length);
    const savingPlan = new SavingPlan({
      name,
      createdBy: req.user._id,
      startDate,
      endDate,
      amount,
      ekubId,
      paymentPlan,
    });
    if (participants.length > 0) {
      for (const participant of participants) {
        savingPlan.participants.push(participant);
      }
    }
    const createdSavingPlan = await savingPlan.save();
    if (createdSavingPlan) {
      await generatePayments(createdSavingPlan);
    }

    return sendResponse(
      res,
      200,
      'savinPlan succesfully created',
      createdSavingPlan,
    );
  } catch (error) {
    logger.error(`creating saving plan failed ${error.message}`, {
      stack: error.stack,
    });
    res.status(500).send('Server error');
  }
};

const getSavingPlansController = async (req, res) => {
  try {
    const savingPlans = await SavingPlan.find({
      createdBy: req.user._id,
    }).populate('participants');
    return sendResponse(
      res,
      200,
      'Saving plans retrieved successfully',
      savingPlans,
    );
  } catch (error) {
    logger.error(`faild while retriving saving plans: ${error.message}`, {
      stack: error.stack,
    });
    return sendResponse(res, 500, 'Server error');
  }
};

const deleteSavingPlanController = async (req, res) => {
  const { id } = req.params;
  try {
    const savingPlan = await SavingPlan.findByIdAndDelete(id);
    return sendResponse(
      res,
      200,
      'Saving plan deleted successfully',
      savingPlan,
    );
  } catch (error) {
    logger.error(`faild while deleting saving plan: ${error.message}`, {
      stack: error.stack,
    });
    return sendResponse(res, 500, 'Server error');
  }
};

const getSavingPlanPaymentsController = async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  try {
    // Count total number of payments for that saving plan
    const totalPayments = await Payment.countDocuments({
      savingPlan: id,
    });
    // Calculate how many pages
    const totalPages = Math.ceil(totalPayments / limit);
    const payments = await Payment.find({ savingPlan: id })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('user', 'fullname phone email');
    if (!payments) {
      return sendResponse(res, 400, 'Saving plan not found');
    }
    return sendResponse(res, 200, 'Payments retrieved successfully', {
      data: payments,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalPayments,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    logger.error(
      `faild while retriving saving plan payments: ${error.message}`,
      {
        stack: error.stack,
      },
    );
    return sendResponse(res, 500, 'Server error');
  }
};

const updatePaymentController = async (req, res) => {
  const { id, paymentId } = req.params;
  try {
    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      { isPaid: true, paymentDate: dayjs() },
      {
        new: true,
      },
    );
    if (!payment) {
      return sendResponse(res, 400, 'Payment not found');
    }
    return sendResponse(res, 200, 'Payment updated successfully', payment);
  } catch (error) {
    logger.error(`faild while updating payment: ${error.message}`, {
      stack: error.stack,
    });
    return sendResponse(res, 500, 'Server error');
  }
};

const getSavingStats = async (req, res) => {
  const { id } = req.params;
  try {
    const savingPlan = await SavingPlan.findById(id).populate('participants');
    if (!savingPlan) {
      return sendResponse(res, 400, 'Saving plan not found');
    }
    const payments = await Payment.find({ savingPlan: id });
    const totalPayments = payments.length;
    const totalParticipants = savingPlan.participants.length;
    const totalAmount = savingPlan.amount * totalPayments;
    const startDate = new Date(savingPlan.startDate);
    const endDate = new Date(savingPlan.endDate);
    const winners = savingPlan.winners.length;

    // Calculate duration in milliseconds
    const msBetween = endDate.getTime() - startDate.getTime();
    const daysBetween = msBetween / (1000 * 60 * 60 * 24);

    let duration = 0;

    switch (savingPlan.paymentPlan) {
      case 'weekly':
        duration = Math.ceil(daysBetween / 7) + ' weeks';
        break;
      case 'biweekly':
        duration = Math.ceil(daysBetween / 14) + ' biweeks';
        break;
      case 'monthly':
        const yearDiff = endDate.getFullYear() - startDate.getFullYear();
        const monthDiff = endDate.getMonth() - startDate.getMonth();
        duration = yearDiff * 12 + monthDiff + 1 + ' months';
        break;
      default:
        duration = 0;
    }

    return sendResponse(res, 200, 'Saving plan stats retrieved successfully', {
      totalPayments,
      totalParticipants,
      totalAmount,
      duration,
      winners,
      name: savingPlan.name,
      startDate: savingPlan.startDate,
      endDate: savingPlan.endDate,
      paymentPlan: savingPlan.paymentPlan,
    });
  } catch (error) {
    logger.error(`faild while retriving saving plan stats: ${error.message}`, {
      stack: error.stack,
    });
    return sendResponse(res, 500, 'Server error');
  }
};

const getParticipantsExcludingWinner = async (req, res) => {
  const { id } = req.params;
  const { fullname } = req.query;

  try {
    // First find the saving plan to get the winner's email
    const savingPlan = await SavingPlan.findById(id).select(
      'participants winners.email',
    );
    if (!savingPlan) {
      return sendResponse(res, 404, 'Saving plan not found');
    }

    // Build the base query to exclude winner

    const winners = savingPlan.winners.map((w) => w.email);
    let participantsQuery = {
      _id: { $in: savingPlan.participants },
      email: { $nin: winners }, // Exclude winner by email
    };
    // Add fullname filter if provided
    if (fullname) {
      participantsQuery.fullname = { $regex: fullname, $options: 'i' }; // Case-insensitive search
    }

    // Execute the query with only necessary fields
    const filteredParticipants = await User.find(participantsQuery)
      .select('fullname email phone') // Only return needed fields
      .lean();

    return sendResponse(
      res,
      200,
      'Participants retrieved successfully',
      filteredParticipants,
    );
  } catch (error) {
    logger.error(
      `Failed while retrieving saving plan participants: ${error.message}`,
      {
        stack: error.stack,
        savingPlanId: id,
      },
    );
    return sendResponse(res, 500, 'Internal server error');
  }
};

const getWinnersController = async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    // Fetch saving plan with winners
    const savingPlan = await SavingPlan.findById(id).lean();

    if (!savingPlan) {
      return sendResponse(res, 404, 'Saving plan not found');
    }

    const allWinners = savingPlan.winners || [];
    const totalWinners = allWinners.length;

    if (totalWinners === 0) {
      return sendResponse(res, 200, 'No winners found', {
        data: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: limit,
        },
      });
    }

    // Slice winners array for pagination
    const paginatedWinners = allWinners.slice(skip, skip + limit);

    // Get unique emails for this page
    const uniqueEmails = [...new Set(paginatedWinners.map((w) => w.email))];

    // Fetch user details
    const users = await User.find(
      { email: { $in: uniqueEmails } },
      { email: 1, fullname: 1, phone: 1 },
    ).lean();

    const userMap = users.reduce((acc, user) => {
      acc[user.email] = user;
      return acc;
    }, {});

    // Construct final winner list with details
    const winnersWithDetails = paginatedWinners.map((winner) => ({
      email: winner.email,
      fullname: userMap[winner.email]?.fullname || 'N/A',
      phone: userMap[winner.email]?.phone || 'N/A',
      wonDate: winner.dueDate,
    }));

    return sendResponse(res, 200, 'Winners retrieved successfully', {
      data: winnersWithDetails,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalWinners / limit),
        totalItems: totalWinners,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return sendResponse(res, 500, 'Internal server error', error.message);
  }
};

const getSavingPlanParticipants = async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10; // default to 10 per page
  const skip = (page - 1) * limit;

  try {
    // Step 1: Find the saving plan and get participant IDs only
    const savingPlan = await SavingPlan.findById(id).select('participants');
    if (!savingPlan) {
      return sendResponse(res, 400, 'Saving plan not found');
    }

    const total = savingPlan.participants.length;

    // Step 2: Paginate the participant IDs
    const paginatedIds = savingPlan.participants.slice(skip, skip + limit);

    // Step 3: Populate user data for paginated IDs
    const participants = await User.find({ _id: { $in: paginatedIds } })
      .select('fullname phone email')
      .lean();

    return sendResponse(
      res,
      200,
      'Saving plan participants retrieved successfully',
      {
        data: participants,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit,
        },
      },
    );
  } catch (error) {
    logger.error(
      `Failed while retrieving saving plan participants: ${error.message}`,
      { stack: error.stack },
    );
    return sendResponse(res, 500, 'Server error');
  }
};

module.exports = {
  startSavingPlanController,
  getSavingPlansController,
  deleteSavingPlanController,
  getSavingPlanPaymentsController,
  updatePaymentController,
  getSavingStats,
  getParticipantsExcludingWinner,
  getWinnersController,
  getSavingPlanParticipants,
};
