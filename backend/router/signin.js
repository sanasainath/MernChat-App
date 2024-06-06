const express=require('express');
const { signin, logout } = require('../controller/signin');
const router=express.Router();
router.post('/signin',signin);
router.get('/logout',logout)
module.exports=router