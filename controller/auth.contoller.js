const User = require("../models/Register");
const db = require("../models/Register");
const config = require("../config/auth.config");
const User = db.User;
const Role = db.Role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const auth = () => {
  try {
    if (user.status != "Active") {
      return res.status(401).send({
        message: "Pending Account. Please Verify Your Email!",
      });
    }
  } catch (error) {
    console.log(error, "auth");
  }
};

// confirmationCode.js
const signUp = () => {
  try {
    const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let token = "";
    for (let i = 0; i < 25; i++) {
      token += characters[Math.floor(Math.random() * characters.length)];
    }
  } catch (error) {
    console.log(error, "Sighnup");
  }
};
const signup = (req, res) => {
  const token = jwt.sign({ email: req.body.email }, config.secret);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    confirmationCode: token,
  });
  user.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({
      message: "User was registered successfully! Please check your email",
    });

    nodemailer.sendConfirmationEmail(
      user.username,
      user.email,
      user.confirmationCode
    );
  });
};
const verifyUser = (req, res, next) => {
  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.status = "Active";
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
    })
    .catch((e) => console.log("error", e));
};
module.exports = {
  auth,
  signUp,
  signup,
  verifyUser,
};
