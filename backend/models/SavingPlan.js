const mongoose = require('mongoose');

// II
const SavingPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    ekubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ekub',
      required: true,
    },
    paymentPlan: {
      type: String,
      enum: ['weekly', 'biweekly', 'monthly'],
      required: true,
    },
    winners: [
      {
        email: String,
        dueDate: Date,
      },
    ],
    lastLotteryDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const SavingPlan = mongoose.model('SavingPlan', SavingPlanSchema);

module.exports = SavingPlan;
