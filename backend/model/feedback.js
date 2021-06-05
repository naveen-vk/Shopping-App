const mongoose=require('mongoose');
var feedbackschema=mongoose.Schema({
    name:{type:String},
    email:{type:String},
    subject:{type:String},
    desc:{type:String},
    status:{type:String,default:"has to resolve"}
});
const feedback= module.exports=mongoose.model('feedback',feedbackschema); 

