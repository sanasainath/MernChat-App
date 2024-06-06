// routes/groupRoutes.js

const express = require('express');
const router = express.Router();
const {createGroup,createGroupMessage,addUserToGroup,getUserGroupNames, getGroupData, getMembersGroup} = require('../controller/groupchat');
const {requireSignIn} = require('../middleware/middleware');

// Import the correct controller function for creating group messages


// Route to create a new group
router.post('/create/groups', requireSignIn, createGroup);
router.post('/add/user/group',requireSignIn,addUserToGroup);

router.post('/add/group/message',requireSignIn,createGroupMessage);
router.get('/get/groups',requireSignIn,getUserGroupNames);
router.get('/data/retrieve/:groupId', getGroupData);
router.get('/get/members/group/:groupId', getMembersGroup);


// Route to create a new group message
// router.post('/group/messages', requireSignIn, createGroupMessage);

module.exports = router;
