const { nodemailer } = require("../helper");

const Project = require("../models/Project");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Forgetnodemailer } = require("../helper/forgetPassword");

const registerStudent = async (req, res) => {
  try {
    const result = await Project.create(req.body);
    // const { email, subject } = nodemailer;
    const data = {
      email: req.body.email,
      name: req.body.name,
      subject: req.body.subject,
      // confirmationCode: req.body.confirmationCode,
    };

    nodemailer({ data });

    return res.status(200).send({
      status: 200,
      message: "Profile Updated Project Student successfully!",
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
const registerStudentToken = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Project.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }
    bcrypt.hash(password.toString(), 10, async (err, hash) => {
      // try {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }

      const newUser = {
        ...req.body,
        password: hash,
      };

      const createdUser = await Project.create(newUser);

      return res.status(200).json({
        success: true,
        message: "Admin Added successfully",
        data: createdUser,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: {},
      success: false,
    });
  }
};
const logOut = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email, password)) {
      res.status(400).send("All Input are required");
    }
    const user = await Project.findOne({ email: req.body.email });

    if (user && (await bcrypt.compare(password, user.password))) {
      //crete token

      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "1h" }
      );
      user.token = token;
      res.status(200).json(user);
    }
    res.status(400).send("INVALID");
  } catch (error) {
    console.log(error, "Error Token");
  }
};
const forgotPassword = async (req, res) => {
  Project.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "USer with his email does not exist" });
    }
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" }
    );
    const data = {
      email: req.body.email,
      name: req.body.name,
      subject: req.body.subject,
    };

    user.token = token;
    res.status(200).json(user);
    Forgetnodemailer({ data });
  });
  return user.updateOne({ resetLink: token }, (err, success) => {
    if (err) {
      return res.status(400).json({ err: "Forget Password " });
    }
  });
};

const getProducts = async (req, res) => {
  try {
    const getData = await Project.find().populate("userId");
    return res.status(200).send({
      status: 200,
      message: "Get Products",
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
const getSingleProduct = async (req, res) => {
  try {
    const data = await Project.findOne({ _id: req.params.id });
    let response = {
      id: data._id,
      name: data.name,
      email: data.email,
      description: data.description,
      category: data.category,
      price: data.price,
    };
    return res
      .status(200)
      .send({ status: 200, message: "Single Product", data: response });
  } catch (error) {
    console.log(error);
  }
};
const deleteProduct = async (req, res) => {
  try {
    const deleteData = await Project.deleteOne({ _id: req.params.id });
    return res.status(200).send({
      status: 200,
      message: "Delete Successful",
      deleteData: deleteData,
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try again later!",
      error: err.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const data = await Project.updateOne(
      { _id: req.params.id },
      {
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        category: req.body.category,
        price: req.body.price,
      }
    );
    res.send(data);
    return res
      .status(200)
      .send({ status: 200, message: "Updated successfully" });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try again later!",
      error: err.message,
    });
  }
};
const aggregationMethod = async (req, res) => {
  try {
    const result = await Project.aggregate([{ $match: { scope: "MCA" } }]);

    return res.status(200).send({
      status: 200,
      message: "Aggregation Method Successs",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try again later!",
      error: err.message,
    });
  }
};

const aggergateSet = async (req, res) => {
  try {
    const result = await Project.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "aggregate",
        },
      },
    ]);
    return res.status(200).send({
      status: 200,
      message: "Aggregation Lookup Successs",
      data: result,
    });
  } catch (error) {
    console.log(error, "lllllll");
  }
};

const login = async (req, res) => {
  console.log(req.body, "pppppppp");
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).send("All Input are required");
    }
    const user = await Project.findOne({ email });

    //crete token

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY
      // { expiresIn: "1h" }
    );
    user.token = token;
    res.status(200).json(user);

    res.status(400).send("INVALID");
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  registerStudent,
  getProducts,
  aggregationMethod,
  aggergateSet,
  logOut,
  registerStudentToken,
  forgotPassword,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  login,
};
