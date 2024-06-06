const mongoose = require('mongoose');
const User = require('./signup');
const Group = require('./group');

const groupMessageSchema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group' // Reference to the Group model
  },
  sender: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // Reference to the User model
    },
    name: {
      type: String,
      required: true
    }
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const GroupMessage = mongoose.model('GroupMessage', groupMessageSchema);

module.exports = GroupMessage;
