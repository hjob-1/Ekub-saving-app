const Ekub = require('../models/Ekub');
const sendResponse = require('../service/responseUtil');

const authorizeEkubInstance = async (req, res, next) => {
  const ekub = await Ekub.findOne({ admin: req.user._id });
  if (!ekub) {
    return sendResponse(res, 400, 'Ekub not found');
  }
  req.body.ekubId = ekub._id;
  next();
};

module.exports = {
  authorizeEkubInstance,
};
