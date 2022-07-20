const express = require("express");
const router = express.Router();
const EventController = require("../controller/EventController");
router.post("/register", EventController.registerStudent);
router.get("/alldata", EventController.getProducts);
module.exports = router;
