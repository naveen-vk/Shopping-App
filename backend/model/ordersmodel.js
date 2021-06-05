const mongoose=require('mongoose');
var randomize = require('randomatic');
const uiqueValidator =require('mongoose-unique-validator');
const orderSchema=mongoose.Schema({
    OrderId:{
        type:String,
        unique:true,
        default:randomize('0', 10),
    },
    isbn:{
         type:Array,
         
    },
    email:{
        type:String,
    
   },
    productname:{
        type:Array,
         
    },
    quantity:{
        type:Array,
    },
    price:{
        type:Number,
 
    },
    address:{
        type:String,
      
    },
    status:{
        type:String,
        default:"order placed"
    },
     createdAt:{
         type:Date,
         default:Date.now
        },
});
orderSchema.plugin(uiqueValidator);
const order=module.exports=mongoose.model('orders',orderSchema);