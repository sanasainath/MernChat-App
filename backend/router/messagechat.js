const express = require('express');
const { requireSignIn } = require('../middleware/middleware'); 
const { sendMessage, getMessages, sidebarUser, getLastSeen } = require('../controller/chatmessage');

const router = express.Router();

// Route to send a message
router.post('/send/:id', requireSignIn, sendMessage);

// Route to fetch messages for a specific user
router.get('/:id', requireSignIn, getMessages);

// Route to fetch sidebar users
router.get('/sidebar/users', requireSignIn, sidebarUser);
router.get('/lastseen/users',requireSignIn,getLastSeen);

module.exports = router;
