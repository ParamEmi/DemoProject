const express = require("express");
const router = express.Router();
const userController = require("../controller/UserControl");
const { check, validationResult } = require('express-validator');
const validator  = require("../helper/users")

router.post("/register", 
check("email")
.isEmail()
.withMessage({message:"Please enter correct email"}),
check('password').isLength({ min: 8 })
.matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
  )
.withMessage({message:"Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. "})
,validator,
  userController.registerStudent
);


router.get("/alldata", userController.getUesr);
router.post("/login" , userController.login);

module.exports = router;
