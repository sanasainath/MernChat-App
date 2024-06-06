const express=require('express')
const router=express.Router();
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });
    
const path = require('path'); 
const {signup}=require('../controller/signup');
router.post('/signup',upload.single('profileImage'),signup);
module.exports=router;
