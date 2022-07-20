const Event = require("../models/EventModel");

const registerStudent = async (req, res) => {
  try {
    const result = await Event.create(req.body);

    return res.status(200).send({
      status: 200,
      message: "Profile Updated Register Student successfully!",
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

const getProducts = async (req, res) => {
  try {
    const getData = await Event.find().populate("userId");
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

module.exports = {
  registerStudent,
  getProducts,
};
