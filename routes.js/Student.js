const express = require("express");
const router = express.Router();
const Student = require("../controller/Student");

router.post("/addStudent", Student.addStudent);
router.post("/addStudentMarks", Student.addStudentMarks);
router.get("/getStudent", Student.getStudents);
router.get("/getStudentMarks", Student.getStudentMarks);
router.get("/getSingleStudent/:id", Student.getSingleStudent);
router.put("/updateStudent/:id", Student.updateStudent);
router.delete("/deleteStudent/:id", Student.deleteStudent);
router.get("/aggregationMethod", Student.aggregationMethod);
router.get("/aggergatelook", Student.aggergatelook);


module.exports = router;
