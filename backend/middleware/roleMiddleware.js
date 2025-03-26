const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../service/logger');

// roleMiddleware.js

// Import the necessary modules

// Middleware function to check the role of the user
const roleMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    try {
      // Get the token from the request headers
      const auth = req.headers.authorization;
      // Check if the token exists
      const token = auth.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get the user ID from the decoded token
      const email = decoded.email;
      console.log(email);
      // Find the user in the database
      const user = await User.findOne({ email: email });

      // Check if the user has the required role
      if (user.role === requiredRole) {
        // User has the required role, proceed to the next middleware
        req.user = user;
        next();
      } else {
        // User does not have the required role, return an error
        res.status(403).json({ message: 'Access denied' });
      }
    } catch (error) {
      logger.error(`User delete failed: ${error.message}`, {
        stack: error.stack,
      });
      // Error occurred while verifying the token
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = roleMiddleware;
