const express = require("express");
const router = express.Router();
const userController = require("../controller/UserControl");
router.post("/register", userController.registerStudent);
router.get("/alldata", userController.getUesr);
module.exports = router;
