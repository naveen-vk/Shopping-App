const mongoose = require('mongoose');

const reviewsSchema = mongoose.Schema({
    userMail:{
        type:String,
        required:true
    },
    isbn:{
        type:Number,
        required:true
    },
    userName:{
        type:String
    },
    review:{
        type:String
    },
    rating:{
        type:Number
    }
});

const review =module.exports=mongoose.model("reviews",reviewsSchema,"reviews");