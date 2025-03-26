const dayjs = require('dayjs');
const Payment = require('../models/Payment');
const SavingPlan = require('../models/SavingPlan');
const logger = require('../service/logger');
const sendResponse = require('../service/responseUtil');
const { generatePayments } = require('../service/paymentService');

const startSavingPlanController = async (req, res) => {
  const {
    name,
    participants,
    startDate,
    endDate,
    amount,
    ekubId,
    paymentPlan,
  } = req.body;

  try {
    const savingPlan = new SavingPlan({
      name,
      createdBy: req.user._id,
      startDate,
      endDate,
      amount,
      ekubId,
      paymentPlan,
    });
    if (participants.length > 1) {
      for (const participant of participants) {
        savingPlan.participants.push(participant);
      }
    }
    const createdSavingPlan = await savingPlan.save();
    if (createdSavingPlan) {
      console.log(createdSavingPlan);
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
  try {
    const savingPlan = await Payment.find({ planId: id }).populate('userId');
    if (!savingPlan) {
      return sendResponse(res, 400, 'Saving plan not found');
    }
    return sendResponse(
      res,
      200,
      'Payments retrieved successfully',
      savingPlan,
    );
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

module.exports = {
  startSavingPlanController,
  getSavingPlansController,
  deleteSavingPlanController,
  getSavingPlanPaymentsController,
  updatePaymentController,
};
