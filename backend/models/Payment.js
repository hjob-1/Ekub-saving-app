const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    savingPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SavingPlan',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentDate: {
      type: Date,
      default: null,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
