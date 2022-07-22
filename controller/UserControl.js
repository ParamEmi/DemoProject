const User = require("../models/UserModel");
const bcrypt =  require("bcrypt");
var jwt = require('jsonwebtoken');
const CONFIG =  require("../config.json")
const { validator,generateToken} = require("../helper/users")
// import Nodemailer from "../helper/index.js";


const registerStudent = async (req, res) => {
  try {
    const {name,email, password,address,phoneNo} = req.body;

    const user = await User.findOne({email});

      if (user) {
        return res.status(400).json({
          message: "Email Already Exists",
          status: 400,
          success: false,
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
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try again later!",
      error: err.message,
      success: false,
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
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try again later!",
      error: err.message,
      success: false,
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
            success: false,
          })
        }

        const validUser =  await bcrypt.compare(password,user.password);
        if(validUser)
        {
        
          let payload = {
            user,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60 * 24,
          }
          const token = await generateToken(user);

          return res.status(200).send({
            status:200,
            message:"login Successfully",
            data:user,
            token:token,
            success: true,
          })
        }
        else{
          return res.status(400).send({
            status:400,
            message:"Invalid username or password",
            success: false,
          })
        }
      }
      else{
        return res.status(400).send({
          status:400,
          message:"User not exist",
          success: false,
        })
      }
    
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try again later!",
      error: err.message,
      success: false,
    });
  }
};

const deleteUser =  async (req,res,next)=>{

  try {
    
      const _id = req.params.id;
    
      const user =  await User.findOne({_id});
      if(user)
      {
        const delUser =  await User.deleteOne({_id})
        if(delUser)
        {
          return res.status(200).send({
            status: 200,
            message: "User delete succesfully",
            success: true,
          });
        }
        else{
          return res.status(400).send({
            status: 400,
            message: "Something went wrong to delete user",
            success: false,
          });
        }
      }
      else{
        return res.status(400).send({
          status: 400,
          message: "User not exist",
          success: false,
        });
      }
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try again later!",
      error: err.message,
      success: false,
    });
  }
}

const getSingleUser =  async (req,res,next)=>{
  try {
   const Id = req.params.id;
   if (!Id)
     return res.status(200).json({
       status: 401,
       success: false,
       message: "Id is required ",
     });
  const payload  = {_id:Id}
   let data =  await User.findOne(payload);
   if(data)
   {
     return res.status(200).send({
       status:200,
       message:"User found successfully",
       data:data,
       success: true,
     });
   }
   else{
     return  res.status(404).send({
       status:404,
       message:"User not found",
       success: false,
     });
   }
 } catch (err) {
   return res.status(500).send({
     status: 500,
     message: "Something went wrong, please try again later!",
     error: err.message,
     success: false,
   });
 }
}

const updateUser = async (req,res,next)=>{
  try {
    const id =  req.params.id;
    const updateUser = {
      ...req.body,
    }

    let result =  await User.updateOne(  {
      _id: id,
    },
    { $set: { ...updateUser } },
    );
    if(result)
    {
      return res.status(200).send({
        status: 200,
        message: "user update succesfully",
        success: true,
      });
    }
    
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: err.message,
      success: false,
    });
  }
}

const getUserBySearch =  async (req,res,next)=>
{
  try {
      const text =  req.params.text;

      const data = await User.find({
        $and:[
          {
            $or: [
              {name: {$regex: String(text), $options: "i" }},
              {address: {$regex: String(text), $options: "i" }},
            ]
          },
          // {role:"admin"}
        ]
       
      });
      if(data)
      {
        return res.status(200).send({
          status:200,
          message:"User search details",
          data:data,
          success:true
        })
      }
      else{
        return res.status(200).send({
          status:200,
          message:"User not found ",
          data:{},
          success:false
        })
      }

  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: err.message,
      success: false,
    });
  }
}

const getUserWithpagination = async (req,res,next)=>{
  try {
      const {pageNo , limit} =  req.params;
      
      let data  =  await User.find().skip(parseInt(pageNo-1)*limit).limit(limit)
      if(data)
      {
        return res.status(200).send({
          status:200,
          message:"user details get succesfully",
          data:data,
          success:true
        })
      }
    
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: err.message,
      success: false,
    });
  }
}

module.exports = {
  registerStudent,
  getUesr,
  login,
  deleteUser,
  getSingleUser,
  updateUser,
  getUserBySearch,
  getUserWithpagination
};
