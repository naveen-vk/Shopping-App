const mongoose=require('mongoose');
var randomize = require('randomatic');

const ProductsSchema=mongoose.Schema({
    
    title:{
        type:String,
      
    },
    isbn:{
        type:String,
        default:randomize('0', 10),
    },
    pageCount:{
        type:String,
      
    },
    publishdate:{
        type:String,
    
    },
    thumbnailUrl:{
        type:String,
       
    },
    shortDescription:{
        type:String,
         
    },
    longDescription:{
        type:String,
        
    },
    authors:{
        type:Array,
    
    },
    categories:{
        type:Array,
        
    },
    price:{
        type:String,
       
    },
    currency:{
        type:String,
        
    },
    discount:{
        type:String,
     
    },
    createdAt:{
         type:Date,
         default:Date.now
        },
});


const Products=module.exports=mongoose.model('Product',ProductsSchema);