const {validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const CONFIG =  require("../config.json")

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
  
  module.exports = {
    validator,
    generateToken,
    authmiddleware
  };