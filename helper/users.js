const {validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const CONFIG =  require("../config.json");
const nodemailer = require('nodemailer');

const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsData = {
      };
      if (errors.array().length > 0) {
        errors.array().forEach((value) => {
          errorsData[value.param] = value.msg;
        });
        // console.log(errorsData);
        return res.json({
          success: false,
          status: 400,
          message: "validation error",
          errors: errorsData,
        });
      }
    } else {
      next();
    }
  };

  const generateToken = (data) => {
    const payload = {
      data,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60 * 24,
    };
    try {
      const token = jwt.sign(payload, CONFIG.JWT_SECRET);
      return token;
    } catch (err) {
      return false;
    }
  };

  const authmiddleware = (req,res,next)=>{

    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer") ||
      !req.headers.authorization.split(" ")[1]
    ) {
      return res.status(401).json({
        success: false,
        message: "Please provide the token",
      });
    }
    try{
      const accessToken = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(accessToken, CONFIG.JWT_SECRET);
      console.log(decoded, "decoded");
      let userId = decoded.data._id;
      console.log(userId, "userId");
      req._user = userId;
      return next();
      }catch(e){
        res.status(400).json('Token not valid')
      }
  }
  
  const sendRegisterEmail =  (user)=>{
    let mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: CONFIG.email_username,
          pass: 'nhrszaijtuvaeaek'
      }
  });
  console.log("user"+CONFIG.email_username);
  console.log("user"+CONFIG.email_password);
   
  let mailDetails = {
      from: 'paramjeet.eminence@gmail.com',
      to: user.email,
      subject: 'Registeration',
      text: user.name + ' your registeration has been successfully'
  };
   
  mailTransporter.sendMail(mailDetails, function(err, data) {
      if(err) {
          console.log('Error Occurs'+err);
      } else {
          console.log('Email sent successfully');
      }
  });
  }

  module.exports = {
    validator,
    generateToken,
    authmiddleware,
    sendRegisterEmail
  };