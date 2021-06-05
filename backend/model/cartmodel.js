const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    
    userMail:{type:String,required:true},
    name : {type : String, require : true},
    pages : {type : String, require : true},
    quantity : { type : Number},
    thumbnailUrl : {type : String},
    author : {type : Array},
    price : { type : Number},
    discount:{ type : Number},
    currency:{type:String},
    isbn:{type:String}
});

module.exports = mongoose.model('Item',cartSchema);