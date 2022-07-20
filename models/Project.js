const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    name: String,
    description: String,
    Scope: String,
    userId: String,
    email: String,
    password: { type: String },
    subject: String,
    token: { type: String },
    resetLink: { data: String, default: "" },

    // userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { collection: "projects" }
);

var Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
