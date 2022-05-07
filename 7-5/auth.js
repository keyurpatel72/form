const mongoose = require('mongoose');


const authSchema = new mongoose.Schema({

    email:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    }

})
const authModel = mongoose.model("auths", authSchema)

module.exports = authModel
