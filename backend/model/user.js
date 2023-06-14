const mongoose = require('mongoose');
const userSchema= mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    role:{type:Number,default: 0},
    created_at:{type:Date,default:Date.now()}

});

module.exports= mongoose.model("users",userSchema);