// services/userService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Ekub = require('../models/Ekub');

/**
 * Registers a new user and returns the registered user object.
 */
const registerUser = async (userData) => {
  const { email, password, role = 'user', phone, fullname } = userData;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user
  const newUser = new User({
    email,
    password: hashedPassword,
    role,
    phone,
    fullname,
  });

  return await newUser.save();
};

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return user;
};

// Generates a JWT token for authenticated users.
const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const activateAccount = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
  const user = await User.findOne({ email: decoded.email });
  if (!user) {
    throw new Error('User not found');
  }
  user.isEmailVerified = true;
  await user.save();
};

const updateUserInfo = async (userId, data) => {
  const { email, phone, fullname } = data;

  const updateFields = {};
  if (email) {
    updateFields.email = email;
    updateFields.isEmailVerified = false;
  }
  if (phone) {
    updateFields.phone = phone;
  }
  if (fullname) {
    updateFields.fullname = fullname;
  }

  const user = await User.findByIdAndUpdate(userId, updateFields, {
    new: true,
  });
  return user;
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  return user;
};

// Adds a user to an Ekub instance if the ekubOwner is an admin.

const addUserToEkub = async (ekubOwner, registredUserId) => {
  if (ekubOwner.role !== 'admin') {
    throw new Error('Only admins can add users to an Ekub');
  }

  const ekub = await Ekub.findOne({ admin: ekubOwner._id });
  if (!ekub) {
    throw new Error('Ekub instance not found for this admin');
  }

  // Add the user to the members list
  ekub.members.push(registredUserId);
  await ekub.save();
};

module.exports = {
  registerUser,
  addUserToEkub,
  authenticateUser,
  generateToken,
  updateUserInfo,
  deleteUser,
  activateAccount,
};
