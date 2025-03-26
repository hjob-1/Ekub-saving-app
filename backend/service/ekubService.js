const Ekub = require('../models/Ekub');
const Payment = require('../models/Payment');
const dayjs = require('dayjs'); // Install with: npm install dayjs

const { deleteUser } = require('./userService');

const createEkubWithAdmin = async (ekubData) => {
  const { name, description, admin, createdBy } = ekubData;
  const ekub = new Ekub({
    name,
    description,
    admin,
    createdBy, // manager id who created the ekub
  });

  return await ekub.save();
};

const deleteEkubMember = async (adminId, removeUserId) => {
  // remove from ekub members
  const ekub = await Ekub.findOne({ admin: adminId });
  if (!ekub) {
    throw new Error('Ekub not found');
  }
  const result = await Ekub.findByIdAndUpdate(
    ekub._id,
    { $pull: { members: removeUserId } },
    { new: true },
  );
  if (!result) {
    throw new Error('Member not found');
  }
  await deleteUser(removeUserId);
};

module.exports = { createEkubWithAdmin, deleteEkubMember };
