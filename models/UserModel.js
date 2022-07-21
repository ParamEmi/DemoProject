const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {type:String, required:true},
    email: {type:String , required:true},
    password: {type:String,required:true},
    address: {type:String , required:true},
    phoneNo:{type:String, required:true},
    role:{type:String , enun:["user","admin"], default:"user"}
  },
  { collection: "users" , timestamps: { createdAt: true, updatedAt: true }  }
);

var User = mongoose.model("User", UserSchema);

module.exports = User;
