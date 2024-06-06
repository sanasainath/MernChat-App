const mongoose = require('mongoose');
const Message=require('./messagechat')
const User=require('./signup')
const conversationSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Message,
    default:[],
  }],
  timestamp: {  
    type: Date,
    default: Date.now
  }
});

const Conversation = mongoose.model('ConversationData', conversationSchema);

module.exports = Conversation;
