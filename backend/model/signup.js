const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender:{
    type:String,
    required:true,
    enum:["male","female"]
  },
  password: {
    type: String,
    required: true
  },
  passwordConfirmation: {
    type: String
  },
  
  profileImage: { // Add profile image field
    type: String // Store image path
  }
  
},{timestamps:true});
const User = mongoose.model('MernChatAppUser', userSchema);

module.exports = User;
