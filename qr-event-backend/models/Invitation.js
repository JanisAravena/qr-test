const mongoose = require('mongoose');

const InvitationSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  used: { type: Boolean, default: false },
});

module.exports = mongoose.model('Invitation', InvitationSchema);