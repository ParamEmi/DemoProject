const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    age: Number,
    address: String,
    phone: Number,
    email_id: String,
    Dob:Object,
    School: Array
  },
  { collection: "student" }
);

var Student = mongoose.model("Student", StudentSchema);

module.exports = Student;

