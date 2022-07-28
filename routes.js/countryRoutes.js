const express = require("express");
const router = express.Router();
const CountryController = require("../controller/CountryControl");

router.post("/add", CountryController.add);
router.get("/get" , CountryController.get);
router.post("/delete",CountryController.deleteLocation)

module.exports = router;
