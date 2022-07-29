const mongoose =  require("mongoose");
const Schema =  mongoose.Schema;

const passwordSchema = new Schema(
    {
        token:{type:String},
        userId:{type:Schema.Types.ObjectId,ref:"User"}
    },
    { collection: "password" , timestamps: { createdAt: true, updatedAt: true }  }
)


var Password = mongoose.model("Password",passwordSchema);
module.exports = Password;