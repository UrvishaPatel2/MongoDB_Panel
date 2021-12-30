const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    pcategory:{
        type:String
    },
    pname:{
        type:String
    },
    uploadImage:{
        type:Array
    }, 
    ptitle:{
        type:String
    },
    url:{
        type:String
    },
    pdate:{
        type:Date
    }
})

module.exports = new mongoose.model('Portfolio',portfolioSchema,'Portfolio')