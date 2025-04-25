const { default: mongoose } = require('mongoose');
const Ekub = require('../models/Ekub');
const Payment = require('../models/Payment');
const SavingPlan = require('../models/SavingPlan');
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

const getEkubDashboardStats = async (req, res) => {
  try {
    const { ekubId } = req.body;

    if (!ekubId) {
      return res.status(400).json({ error: 'ekubId is required' });
    }

    // Get ekub details (and members)
    const ekub = await Ekub.findById(ekubId).populate('members');

    if (!ekub) {
      return res.status(404).json({ error: 'Ekub not found' });
    }

    // All users in this Ekub
    const totalMembers = ekub.members.length;

    // Saving Plans for this ekub
    const savingPlans = await SavingPlan.find({ ekubId });

    const totalSavingPlans = savingPlans.length;
    const ongoingPlans = savingPlans.filter(
      (sp) => new Date(sp.endDate) > new Date(),
    ).length;
    const completedPlans = totalSavingPlans - ongoingPlans;

    const savingPlanIds = savingPlans.map((sp) => sp._id);

    // Total money collected so far (only paid payments)
    const collected = await Payment.aggregate([
      { $match: { savingPlan: { $in: savingPlanIds }, isPaid: true } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const totalCollected = collected[0]?.total || 0;

    const recentWinners = await SavingPlan.aggregate([
      { $match: { ekubId: new mongoose.Types.ObjectId(ekubId) } }, // filter by ekub
      { $unwind: '$winners' }, // flatten winners array
      {
        $lookup: {
          from: 'users',
          localField: 'winners.email',
          foreignField: 'email',
          as: 'userDetails',
        },
      },
      { $unwind: { path: '$userDetails', preserveNullAndEmptyArrays: true } },
      { $sort: { 'winners.dueDate': 1 } },
      { $limit: 2 },
      {
        $project: {
          _id: 0,
          savingName: '$name',
          email: '$winners.email',
          dueDate: '$winners.dueDate',
          fullname: '$userDetails.fullname',
          phone: '$userDetails.phone',
          amount: {
            $multiply: ['$amount', { $size: '$participants' }],
          },
        },
      },
    ]);

    // New users added in the last 7 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const newUsers = ekub.members
      .filter((user) => {
        return user.createdAt >= oneWeekAgo;
      })
      .map((user) => ({
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
      }));

    return sendResponse(res, 200, 'Dashboard stats successfully fetched', {
      totalMembers,
      totalSavingPlans,
      ongoingPlans,
      completedPlans,
      totalCollected,
      newUsers,
      recentWinners,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getEkubDashboardStats };

module.exports = {
  createEkubInstanceController,
  getEkubMembersController,
  deleteEkubMemberController,
  updateEkubMemberController,
  getEkubDashboardStats,
};
