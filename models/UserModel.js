const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {type:String, required:true},
    email: {type:String , unique : true ,required:true},
    password: {type:String},
    address: {type:String , required:true},
    phoneNo:{type:String, required:true},
    role:{type:String , enun:["user","admin"], default:"user"},
    profilePic: {type:String}
  },
  { collection: "users" , timestamps: { createdAt: true, updatedAt: true }  }
);

var User = mongoose.model("User", UserSchema);

module.exports = User;
