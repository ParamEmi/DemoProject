const User = require("../models/UserModel");
const bcrypt =  require("bcrypt");
var jwt = require('jsonwebtoken');
const CONFIG =  require("../config.json")
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

const login =  async (req,res)=>{
  try {
      const {email , password} =  req.body;
      const user =  await User.findOne({email})
      if(user)
      {
        const userType =  user.role;
        if(userType!="admin")
        {
          return res.status(400).send({
            status:400,
            message:"Access denied only admin can login here",
          })
        }

        const validUser =  await bcrypt.compare(password,user.password);
        if(validUser)
        {


          return res.status(200).send({
            status:200,
            message:"login Successfully",
            data:user
          })
        }
        else{
          return res.status(400).send({
            status:400,
            message:"Invalid username or password",
          })
        }
      }
      else{
        return res.status(400).send({
          status:400,
          message:"User not exist",
        })
      }
    
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
  login
};
