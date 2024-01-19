const mongoose=require("mongoose")
const LoginSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
        },
    password:{
        type:String,
        required:true,

    },
    date:{
        type:Date,
        default: Date.now,
        required:true

    },
    email:{
        type:String,
        required:true,
        },

    
})
const User=mongoose.model('login', LoginSchema)
module.exports= User
