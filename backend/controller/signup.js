const User = require('../model/signup');
const bcrypt = require('bcrypt');
const dotenv=require('dotenv')
dotenv.config({path:'./config.env'});

const jwt = require('jsonwebtoken');
exports.signup = async (req, res) => {
  try {
    const { fullName, username, email, password, passwordConfirmation, gender} = req.body;
  
    

    // Check if password matches confirmation
    if (!password || !passwordConfirmation || password !== passwordConfirmation) {
      return res.status(400).json({ message: 'Password and password confirmation must match' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    let profileImage = '';
    if (req.file) {
      console.log(req.file);
   profileImage=process.env.APP_API + '/public/images/' + req.file.filename;
    }


    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password and additional fields
    const newUser = new User({ 
      fullName, 
      username, 
      email, 
      password: hashedPassword, 
      gender, 
      profileImage
     
    });
    const token = jwt.sign({ userId: newUser._id,username:username,fullName:fullName ,profileImage:profileImage}, process.env.JWT_SECRET, { expiresIn: '1d' });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' ,user:newUser,token:token});
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err.message });
  }
};
