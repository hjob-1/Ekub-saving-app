const Ekub = require('../models/Ekub');
const {
  createEkubWithAdmin,
  deleteEkubMember,
} = require('../service/ekubService');
const logger = require('../service/logger');
const sendResponse = require('../service/responseUtil');
const { registerUser } = require('../service/userService');

// Create an instance of an ekub

const createEkubInstanceController = async (req, res) => {
  const { name, description } = req.body;

  try {
    const registerEquibOwner = await registerUser(req.body);
    const ekub = await createEkubWithAdmin({
      admin: registerEquibOwner._id,
      createdBy: req.user._id,
      name,
      description,
    });

    return sendResponse(res, 201, 'Ekub created successfully', ekub);
  } catch (error) {
    logger.error(`faild while creating ekub instance: ${error.message}`, {
      stack: error.stack,
    });
    return sendResponse(res, 500, 'Server error');
  }
};

// Get all members of an ekub
const getEkubMembersController = async (req, res) => {
  const admin = req.user;
  try {
    const ekub = await Ekub.findOne({ admin: admin._id }).populate('members');
    if (!ekub) {
      return sendResponse(res, 400, 'Ekub not found');
    }
    return sendResponse(
      res,
      200,
      'Members retrieved successfully',
      ekub.members,
    );
  } catch (error) {
    logger.error(`faild while retriving ekub instance: ${error.message}`, {
      stack: error.stack,
    });
    return sendResponse(res, 500, 'Server error');
  }
};

const deleteEkubMemberController = async (req, res) => {
  const { id: removeUserId } = req.params;
  const admin = req.user;
  try {
    await deleteEkubMember(admin._id, removeUserId);
    return sendResponse(res, 200, 'Member removed successfully');
  } catch (error) {
    logger.error(`faild while deleting ekub member: ${error.message}`, {
      stack: error.stack,
    });
    return sendResponse(res, 500, 'Server error');
  }
};

module.exports = {
  createEkubInstanceController,
  getEkubMembersController,
  deleteEkubMemberController,
};
