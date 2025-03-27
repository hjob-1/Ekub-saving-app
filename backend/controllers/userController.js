const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendResponse = require('../service/responseUtil');
const logger = require('../service/logger');
const {
  registerUser,
  addUserToEkub,
  authenticateUser,
  updateUserInfo,
  generateToken,
  activateAccount,
} = require('../service/userService');
const { sendEmail } = require('../service/emailService');

const registerUserController = async (req, res) => {
  try {
    const userData = req.body;
    const ekubOwner = req.user;

    // Register the user
    const registredUser = await registerUser(userData);

    if (registredUser.role === 'admin') {
      // send email to user
      const activationToken = generateToken(registredUser.email);
      // send email to user
      await sendEmail({
        type: 'activate',
        activationToken,
        user: registredUser,
      });
    }

    // Add the user to the Ekub if the owner is an admin
    if (ekubOwner && ekubOwner.role === 'admin') {
      await addUserToEkub(ekubOwner, registredUser._id);
    }

    return sendResponse(res, 201, 'User created successfully');
  } catch (error) {
    logger.error(`User registration failed: ${error.message}`, {
      stack: error.stack,
    });
    return sendResponse(res, 500, error.message);
  }
};

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    // is succesffuly token should be genrated
    if (user && !user.isEmailVerified) {
      return sendResponse(res, 401, 'verify your account first');
    }
    const token = generateToken(user.email);
    res.setHeader('Authorization', `Bearer ${token}`);
    return sendResponse(res, 200, 'Login successful', { ...user._doc });
  } catch (error) {
    logger.error(`User login failed: ${error.message}`, {
      stack: error.stack,
    });
    return sendResponse(res, 500, 'Server error');
  }
};

const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await updateUserInfo(id, req.body);
    return sendResponse(res, 200, 'User updated successfully', user);
  } catch (error) {
    logger.error(`User update infromation failed: ${error.message}`, {
      stack: error.stack,
    });
    return sendResponse(res, 500, 'Server error');
  }
};

const activateAccountController = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token after 'Bearer'

    if (!token) return sendResponse(res, 401, 'access denied');
    await activateAccount(token);

    return sendResponse(res, 200, 'Account activated successfully');
  } catch (error) {
    logger.error(`Account activation failed: ${error.message}`, {
      stack: error.stack,
    });
    return sendResponse(res, 500, 'Server error');
  }
};

const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    return sendResponse(res, 200, 'User deleted successfully', user);
  } catch (error) {
    logger.error(`User delete failed: ${error.message}`, {
      stack: error.stack,
    });
    return sendResponse(res, 500, 'Server error');
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 404, 'User not found');
    }
    // if found send email to user to set password
    const resetToken = generateToken(user.email);
    await sendEmail({
      type: 'reset',
      resetToken,
      user,
    });
    return sendResponse(res, 200, 'Reset password email sent');
  } catch (error) {
    logger.error(`Forgot password failed: ${error.message}`, {
      stack: error.stack,
    });
    return sendResponse(res, 500, 'Server error');
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { password } = req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token after 'Bearer'

    if (!token) return sendResponse(res, 401, 'access denied');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return sendResponse(res, 404, 'User not found');
    }
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    return sendResponse(res, 200, 'Password reset successful');
  } catch (error) {
    logger.error(`Reset password failed: ${error.message}`, {
      stack: error.stack,
    });
    return sendResponse(res, 500, 'Server error');
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  updateUserController,
  activateAccountController,
  forgotPasswordController,
  resetPasswordController,
};
