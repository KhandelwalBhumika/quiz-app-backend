const bcrypt = require("bcrypt");
const saltRounds = 12;
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const {
  creatingNewUser,
  findOneUser,
  findOneUserByEmailOrRegisterID,
  findOneUserByRegId,
} = require("../services/userServices");

module.exports = {
  creatingSignUp: async (req, res) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        registrationId: req.body.registrationId,
        //hashed password
        password: await bcrypt.hash(req.body.password, saltRounds),
      };
      const newUser = await creatingNewUser(user);
      return res.status(200).json({
        status: "Success",
        message: "User registerd successfully",
      });
    } catch (err) {
      res.json({
        status: "error",
        message: err.message,
      });
    }
  },

  creatingLogIn: async (req, res) => {
    try {
      if (
        (req.body.email !== null || req.body.registrationId !== null) &&
        req.body.password !== null
      ) {
        //|| req.body.registrationId !== null
        const query = {
          $or: [
            { email: req.body.email },
            { registrationId: req.body.registrationId },
          ],
        };
        const pickUser = await findOneUserByEmailOrRegisterID(query);
        // const registrationUser = await findOneUserByRegId({
        //   registrationId: req.body.registrationId
        // })
        if (!pickUser) {
          return res.send({
            status: "error",
            message: "incorect password or email/registrationId",
          });
        }
        //evaluate password
        // if (pickUser) {
          const passwordChecker = await bcrypt.compare(
            req.body.password,
            pickUser.password
          );

          if (passwordChecker == false) {
            return res.send({
              status: "error",
              message: "incorect password or email/registrationId",
            });
          }

          //Create JWTs
          const accessToken = jwt.sign(
            {
              user: {
                _id: pickUser._id,
              },
            },
            process.env.KEY,
            {
              expiresIn: 60 * 60 * 24 * 7,
            }
          );
          res.cookie("token", accessToken);
          return res.status(200).json({
            status: "success",
            message: "user successfully loggedIn",
            token: accessToken,
            name: `${pickUser.firstName} ${pickUser.lastName}`,
          });
        // }
      }
      return res.json({
        status: "error",
        message: "please send email/registrationId and password",
      });
    } catch (err) {
      return res.json({
        status: "error",
        message: err.message,
      });
    }
  },
};
