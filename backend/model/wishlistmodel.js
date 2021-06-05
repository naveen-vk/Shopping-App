const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
    userMail:{
        type:String,
        required:true
    },
    isbn:{
        type:Number,
        required:true
    }
});

const wishlist =module.exports=mongoose.model("wishlists",wishlistSchema,"wishlists");