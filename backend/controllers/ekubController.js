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
const {
  registerUser,
  updateUserInfo,
  generateToken,
} = require('../service/userService');
const { sendEmail } = require('../service/emailService');

// Create an instance of an ekub

const createEkubInstanceController = async (req, res) => {
  const { name, description } = req.body;

  try {
    const registerEquibOwner = await registerUser(req.body);
    if (registerEquibOwner.role === 'admin') {
      // send email to user
      const activationToken = generateToken(registerEquibOwner.email);
      // send email to user
      await sendEmail({
        type: 'activate',
        activationToken,
        user: registerEquibOwner,
      });
    }
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
// Get all members of an ekub, with pagination & optional search
const getEkubMembersController = async (req, res) => {
  const admin = req.user;
  const { search = '', page = '1', limit = '10' } = req.query;
  const pageNum = parseInt(page, 10);
  const perPage = parseInt(limit, 10);
  const skip = (pageNum - 1) * perPage;

  try {
    // 1) find ekub for this admin
    const ekub = await Ekub.findOne({ admin: admin._id });
    if (!ekub) {
      return sendResponse(res, 400, 'Ekub not found');
    }

    // 2) build filter: only members of this ekub, plus optional text search
    const baseFilter = { _id: { $in: ekub.members } };
    const searchFilter = search
      ? {
          ...baseFilter,
          $or: [
            { email: { $regex: search, $options: 'i' } },
            { fullname: { $regex: search, $options: 'i' } },
          ],
        }
      : baseFilter;

    // 3) run count + paged find in parallel
    const [totalItems, participants] = await Promise.all([
      User.countDocuments(searchFilter),
      User.find(searchFilter)
        .skip(skip)
        .limit(perPage)
        .select('_id email fullname phone')
        .lean(),
    ]);

    // 4) if no members at all
    if (participants.length === 0) {
      return sendResponse(res, 200, 'No members found', {
        data: [],
        pagination: {
          currentPage: pageNum,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: perPage,
        },
      });
    }

    // 5) successful response with pagination meta
    return sendResponse(res, 200, 'Members retrieved successfully', {
      data: participants,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalItems / perPage),
        totalItems,
        itemsPerPage: perPage,
      },
    });
  } catch (error) {
    logger.error(`Failed retrieving ekub members: ${error.message}`, {
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

async function getEkubMemberStats(req, res) {
  const adminId = req.user._id;

  try {
    // 1) find ekub for this admin
    const ekub = await Ekub.findOne({ admin: adminId }).lean();
    if (!ekub) {
      return sendResponse(res, 404, 'Ekub not found');
    }

    const memberIds = ekub.members || [];
    const totalMembers = memberIds.length;

    // 2) count new members in last 7 days
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const newThisWeek = await User.countDocuments({
      _id: { $in: memberIds },
      createdAt: { $gte: oneWeekAgo },
    });

    // 3) return simplified stats
    return sendResponse(res, 200, 'Member stats retrieved', {
      totalMembers,
      newThisWeek,
    });
  } catch (err) {
    console.error('Error in getEkubMemberStats:', err);
    return sendResponse(res, 500, 'Server error retrieving stats');
  }
}

module.exports = {
  createEkubInstanceController,
  getEkubMembersController,
  deleteEkubMemberController,
  updateEkubMemberController,
  getEkubDashboardStats,
  getEkubMemberStats,
};
