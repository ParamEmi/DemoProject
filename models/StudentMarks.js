const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentMarksSchema = new Schema(
  {
    percentage:Number,
    studentid: {
        type: Schema.Types.ObjectId, ref: "Student" 
    }

  },
  { collection: "studentmarks" }
);

var StudentMarks = mongoose.model("StudentMarks", StudentMarksSchema);

module.exports = StudentMarks;

