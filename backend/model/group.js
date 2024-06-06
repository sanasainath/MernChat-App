const User=require('./signup')
const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: User // Reference to the User model
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User // Reference to the User model
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Group = mongoose.model('GroupUsers', groupSchema);

module.exports = Group;
