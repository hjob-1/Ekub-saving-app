const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    isEmailVerified: { type: Boolean, default: false },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, enum: ['admin', 'user', 'manager'], default: 'user' },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);
module.exports = User;
