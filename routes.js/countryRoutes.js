const express = require("express");
const router = express.Router();
const CountryController = require("../controller/CountryControl");

router.post("/add", CountryController.add);
router.get("/get" , CountryController.get);

module.exports = router;
