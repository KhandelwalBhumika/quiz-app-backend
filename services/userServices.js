const User = require('../models/user.js');

module.exports.creatingNewUser = async (user) => {
    return await User.create(user)
}

module.exports.findOneUserByEmailOrRegisterID = async (query) => {
    return await User.findOne(query).lean()
}

module.exports.findOneUserByRegId = async (registrationId) => {
    return await User.findOne(registrationId).lean()
}