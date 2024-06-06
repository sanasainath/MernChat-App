const User = require('../model/signup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
       

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Generate JWT token
        
        const token = jwt.sign({ email:req.body.email,userId: user._id,username:user.username,fullName:user.fullName ,profileImage:user.profileImage,gender:user.gender,}, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Set token as HTTP cookie
        res.cookie('token', token, {
            httpOnly: true, // This prevents JavaScript from accessing the token
            maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https' // Ensures that the cookie is only sent over HTTPS in production
        });

        res.status(200).json({ message: 'Sign in successful' ,token});
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
exports.logout = (req, res) => {
  // Clear token cookie
  res.clearCookie('token', { path: '/' });
  localStorage.removeItem('token');
  res.status(200).json({ message: 'Logout successful' });
};
