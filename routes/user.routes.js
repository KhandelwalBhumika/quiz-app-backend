require('dotenv').config()

const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const userController = require('../controller/userController');
const joiValidation = require('../middleware/joiValidation');
const joiValidationSchema = require('../utils/validation');

//Creating User/signUp --> working
router.post('/signUp', joiValidation.joiValidator(joiValidationSchema.signupValidation), userController.creatingSignUp)

//LogIn --> working
router.post('/logIn', joiValidation.joiValidator(joiValidationSchema.loginValidation), userController.creatingLogIn)

module.exports = router;