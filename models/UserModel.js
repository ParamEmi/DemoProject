const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: String,
    description: String,
    category: String,
    email: String,
    quantity: Number,
    price: Number,
    images: String,
  },
  { collection: "users" }
);

var User = mongoose.model("User", UserSchema);

module.exports = User;
