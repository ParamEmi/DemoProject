const express = require("express");
var bodyParser = require("body-parser");
const CONFIG =  require("./config.json")
const app = express();
var cors = require("cors");

// require("./config/database");
require("./config/dataBase.js");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("app is listening on port " + process.env.PORT);
});

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.use("/test",  (req,res)=>{
  res.send("testing message 2")
});
app.use("/user", require("./routes.js/userRoutes"));

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
});

/** catch 404 and forward to error handler */
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesnt exist",
  });
});
module.exports = app;
