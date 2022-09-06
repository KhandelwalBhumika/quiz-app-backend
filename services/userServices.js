const User = require('../models/user.js');

module.exports.creatingNewUser = async (user) => {
    return await User.create(user)
}

module.exports.findOneUserByEmail = async (email) => {
    return await User.findOne(email).lean()
}

module.exports.findOneUserByRegId = async (registrationId) => {
    return await User.findOne(registrationId).lean()
}