const mongoose = require('mongoose');

const ekubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId, // Only store the user ID
        ref: 'User', // Reference to the User schema
      },
    ],
  },
  { timestamps: true },
);

const Ekub = mongoose.model('Ekub', ekubSchema);
module.exports = Ekub;
