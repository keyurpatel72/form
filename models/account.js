const mongoose = require('mongoose');


const accountSchema = new mongoose.Schema({

    ac_name:{
        type:String
       
    },
    ac_owner_name:{
        type:String
       
    },
    ac_address1 :{
    type:String
   
    },
    ac_address2:{
        type:String
        
    },
    ac_country:{
        type:String,
    },
    ac_State:{
        type:String,
    },
    ac_city:{
        type:String,
    },
    zip:{
        type:String,
        required:[true,"email is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    phn_num:{
        type:String,
        required:[true,"email is required"]
    },
    time:{
        type: Date,
        default: Date.now,
        required:[true,"email is required"]
    },
    billing_dc_name:{
        type:String,
        required:[true,"email is required"]
    },
    billing_dc_number:{
        type:String,
        required:[true,"email is required"]
    },
    billing_dc_email:{
        type:String,
        required:[true,"email is required"]
    },
    status:{
        type:String,
        required:[true,"email is required"] 
    }
  

})
const accountModel = mongoose.model("account", accountSchema)

module.exports = accountModel
