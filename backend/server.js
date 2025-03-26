const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const logger = require('./service/logger');
const app = express();
const connectDB = require('./config/db');

// Middleware
app.use(express.json());
app.use(express.static('../ekub_saving_frontend/dist'));
// Enable CORS for all routes
app.use(cors());

app.use((req, res, next) => {
  logger.info(
    `Incoming Request: ${req.method} ${req.url} - Body: ${JSON.stringify(
      req.body,
    )}`,
  );
  next();
});
// Connect to MongoDB
connectDB();

// routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/ekubs', require('./routes/ekubRoutes'));
app.use('/api/ekubs/saving-plans', require('./routes/savingPlanRoutes'));
// Start the server

// for listing the frontend
app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
const port = process.env.PORT || 5000;
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  console.log('happy hacking');
});
