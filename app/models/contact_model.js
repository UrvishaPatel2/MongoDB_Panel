const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    contactnumber:{
        type:String
    },
    message:{
        type:String
    },
    date:{
        type:Date
    }
})

module.exports = new mongoose.model('Contact',contactSchema,'Contact')