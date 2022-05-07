const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    password:String,
    role:String,
    account:String
    // name:{
    //     type:String,
    //     required:[true,"email is required"]
    // },
    // email: {
    //     type: String,
    //     required: [true, "email is required"]
    // }, 
    // password: {
    //     type: String,
    //     required: [true, "email is required"]
    // }, 
    // role: {
    //     type: String,
    //     required: [true, "email is required"]
    // }, 
    // account: {
    //     type: String,
    //     required: [true, "email is required"]
    // },
    //     date:{
    //         type:Date,
    //         default:Date.now
    //     }
    
})
var User = mongoose.model("user", userSchema);

// const UserModel = mongoose.model("user", UserSchema)

 module.exports = User

