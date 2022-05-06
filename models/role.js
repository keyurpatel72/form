const mongoose = require('mongoose');


const roleSchema = new mongoose.Schema({

    role_name:{
        type:String
    },
    role_description:{
        type:String
    },
    dashboard:{
        type:String
    },
    role:{
        type:String
    },
    users:{
        type:String
    }
  

})
const roleModel = mongoose.model("role", roleSchema)

module.exports = roleModel
