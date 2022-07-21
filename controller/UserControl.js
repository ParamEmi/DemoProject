const User = require("../models/UserModel");
const bcrypt =  require("bcrypt");
// import Nodemailer from "../helper/index.js";


const registerStudent = async (req, res) => {
  try {
    const {name,email, password,address,PhoenNumber} = req.body;

    const user = await User.findOne({email});

      if (user) {
        return res.status(400).json({
          message: "Email Already Exists",
          status: 400,
        });
      }

    let hashPassword  = await bcrypt.hash(password.toString(), 10);
    
    const newUser = {
      ...req.body,
      password:hashPassword
    }
    const result = await User.create(newUser);

    return res.status(200).send({
      status: 200,
      message: "User created successfully successfully!",
      data: result,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try again later!",
      error: err.message,
    });
  }
};


const getUesr = async (req, res) => {
  try {
    const getData = await User.find();

    // console.log(getData, "??????????????????");
    return res.status(200).send({
      status: 200,
      message: "users details get succesfully",
      data: getData,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try again later!",
      error: err.message,
    });
  }
};

module.exports = {
  registerStudent,
  getUesr,
};
