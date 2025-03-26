// responseUtil.js

const sendResponse = (res, statusCode, message, data = null) => {
  const status = statusCode >= 400 ? 'error' : 'success';

  const response = {
    status,
    message,
  };

  if (data) response.data = data;

  res.status(statusCode).json(response);
};

module.exports = sendResponse;
