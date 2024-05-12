const mongoose=require('mongoose');
const newmodel=new mongoose.Schema({
    username:{
        type:String
    },
    email:{
 type:String
    },
    password:{
 type:String
    },
    otp:{
        type:Number
    }
})
const model=mongoose.model("users",newmodel)
module.exports=model;