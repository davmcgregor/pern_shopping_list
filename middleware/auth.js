require("dotenv").config();
const jwt = require("jsonwebtoken");

//this middleware will on continue on if the token is inside the local storage

module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) return res.status(401).json('No token, authorization denied');
    
    try {

        const decoded = jwt.verify(token, process.env.jwtSecret);

        req.user = decoded;
        
        next();

    } catch (err) {
        res.status(400).json('Token is not valid');
    }
};