const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    gender:{
        type:String
    },
    phoneno:{
        type:Number
    },
    password:{
        type:String
    },
    uploadImage:{
        type:String
    },
    city:{
        type:String
    },
    isAdmin: Boolean
});



module.exports = new mongoose.model('Register',userSchema,'Register');