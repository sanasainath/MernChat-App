const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config({ path: '../config.env' });

const requireSignIn = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header is missing' });
        }
        const token = authHeader.replace(/^Bearer\s+/, ''); // Remove 'Bearer ' prefix and any whitespace
       
        if (!token) {
            return res.status(401).json({ message: 'Token is missing' });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'Token has expired' });
                }
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error('Error occurred during token verification:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const userMiddleware = (req, res, next) => {
    // Your user middleware logic here
    if (req.user.role !== 'user') {
        return res.status(403).json({ message: 'User Access denied' });
    }
    next();
};

const adminMiddleware = (req, res, next) => {
    // Log the req.user object for debugging
    console.log('User object:', req.user);

    // Your admin middleware logic here
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin Access denied' });
    }
    next();
};

module.exports = {
    requireSignIn, userMiddleware, adminMiddleware
};
