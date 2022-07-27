const express = require("express");
const router = express.Router();
const userController = require("../controller/UserControl");
const { check, validationResult } = require('express-validator');
const multer  = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const ext =  file.mimetype.split('/')[1]
    const uniqueSuffix = Date.now() + '.'+ext 
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const multerFilter =  (req,res,cb)=>{
  if(!req.mimetype.split('/')[1]==='pdf')
  {
    cb(null,true)
  }
  else{
    cb(new Error('Not a PDF file '), false)
  }
}
const upload = multer({ storage: storage })
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
router.put("/changePassword",authmiddleware, userController.changePassword)
router.post("/forgot",userController.forgotPassword)
router.post("/reset",userController.resetPassword);
router.post("/profile" ,upload.single('image'), userController.profilePic);

module.exports = router;
