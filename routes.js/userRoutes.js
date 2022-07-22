const express = require("express");
const router = express.Router();
const userController = require("../controller/UserControl");
const { check, validationResult } = require('express-validator');
const { validator,generateToken,authmiddleware}  = require("../helper/users")

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
authmiddleware,userController.registerStudent
);

router.get("/alldata",authmiddleware, userController.getUesr);
router.post("/login" , userController.login);
router.get("/deleteUser/:id" , authmiddleware,userController.deleteUser);
router.get("/getSingleUser/:id" , authmiddleware,userController.getSingleUser)

module.exports = router;
