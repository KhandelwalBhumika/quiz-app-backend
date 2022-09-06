require('dotenv').config()

const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

module.exports.authenticateToken = async (req, res, next) => {
    const token =
        req.headers["Authorization"] ||
        req.headers["authorization"] ||
        req.headers["x-access-token"];
    if (!token) {
        return res.status(401).json({
            status: "error",
            message: "Token is required"});
    }
    try {
        const decoded = jwt.verify(token, process.env.KEY);
        req.user = decoded.user
        return next();
    } catch (err) {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized token"});
    }
}