const express = require("express");
const router = express.Router();
const Project = require("../controller/Project");

router.post("/register", Project.registerStudent);
router.post("/registerToken", Project.registerStudentToken);

router.post("/logout", Project.logOut);

router.get("/alldata", Project.getProducts);
router.get("/aggregation", Project.aggregationMethod);
router.get("/aggregateset", Project.aggergateSet);
router.delete("/delete/:id", Project.deleteProduct);
router.put("/update/:id", Project.updateProduct);
// singleProduct
router.get("/getsingleProduct/:id", Project.getSingleProduct);
router.post("/login", Project.login);

module.exports = router;
