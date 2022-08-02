const express = require("express");
const router = express.Router();
const userController = require("../controller/UserControl");
const { check, validationResult } = require('express-validator');
const multer  = require('multer');
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const ext =  file.mimetype.split('/')[1]
    const uniqueSuffix = Date.now() + '.'+ext 
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
});

const fileFilter = function (req, file, cb) {
  var ext = path.extname(file.originalname);
  if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb(new Error('Invalid file type. Only jpg, png image files are allowed.'),false)
  }
  cb(null, true)
}

let fileObj = {
  storage: storage,
  limits: {
      fileSize: 1024
},
  fileFilter: fileFilter
};

const upload = multer(fileObj);

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
router.get("/getSingleUser/:id" , authmiddleware,userController.getSingleUser);
router.put("/updateUser/:id" ,check("email")
.isEmail()
.withMessage({message:"Please enter correct email"})
,validator, authmiddleware,userController.updateUser);
router.get("/getUserBySearch/:text" ,authmiddleware, userController.getUserBySearch);
router.get("/getUserWithpagination/:pageNo/:limit" ,authmiddleware, userController.getUserWithpagination);
router.put("/changePassword",check('newPassword').isLength({ min: 8 })
.matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
  )
.withMessage({message:"Please enter a new password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. "})
,validator,authmiddleware, userController.changePassword)
router.post("/forgot",userController.forgotPassword)
router.post("/reset",userController.resetPassword);
router.get("/deletePic/:id",authmiddleware,userController.deletePic);
router.post("/profile" ,upload.single('image'), userController.profilePic);
router.post("/info",authmiddleware,userController.sendInfo);

module.exports = router;
