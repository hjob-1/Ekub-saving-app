const Ekub = require('../models/Ekub');
const User = require('../models/User');
const {
  createEkubWithAdmin,
  deleteEkubMember,
} = require('../service/ekubService');
const logger = require('../service/logger');
const sendResponse = require('../service/responseUtil');
const { registerUser, updateUserInfo } = require('../service/userService');

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
  const { query } = req.query;
  try {
    const ekub = await Ekub.findOne({ admin: admin._id });
    if (!ekub) {
      return sendResponse(res, 400, 'Ekub not found');
    }
    const searchFilter = query
      ? {
          _id: { $in: ekub.members },
          $or: [
            { email: { $regex: query, $options: 'i' } },
            { fullName: { $regex: query, $options: 'i' } }, // or `name`
          ],
        }
      : { _id: { $in: ekub.members } };

    const users = await User.find(searchFilter).select(
      '_id email fullname phone',
    );
    if (!users) {
      return sendResponse(res, 400, 'No members found');
    }

    return sendResponse(res, 200, 'Members retrieved successfully', users);
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

const updateEkubMemberController = async (req, res) => {
  const { id } = req.params;
  const admin = req.user;

  try {
    const ekub = await Ekub.findOne({ admin: admin._id });
    if (!ekub) {
      return sendResponse(res, 400, 'Ekub not found');
    }

    const member = ekub.members.find((user) => user._id.toString() === id);

    if (!member) {
      return sendResponse(res, 400, 'Member not found');
    }
    const updatedMember = await updateUserInfo(id, req.body);
    if (!updatedMember) {
      return sendResponse(res, 400, 'Failed to update member');
    }

    await ekub.save();
    return sendResponse(res, 200, 'Member updated successfully', member);
  } catch (error) {
    logger.error(`failed while updating ekub member: ${error.message}`, {
      stack: error.stack,
    });
    return sendResponse(res, 500, 'Server error');
  }
};

module.exports = {
  createEkubInstanceController,
  getEkubMembersController,
  deleteEkubMemberController,
  updateEkubMemberController,
};
