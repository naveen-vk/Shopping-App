var express=require('express');
var mongoose=require('mongoose');

var cors = require('cors');
var app=express();
const route =require('./routes/user')
const route2 =require('./routes/book')
const route3 =require('./routes/orders')
const route4 =require('./routes/feedback')
const route5 = require('./routes/wishlist')
const route6 = require('./routes/cart')
const route7 = require('./routes/reviews')



mongoose.connect('mongodb+srv://deekshith:d1234@cluster0.x79cl.mongodb.net/bookstore?retryWrites=true&w=majority', { useNewUrlParser:true, useUnifiedTopology: true , useCreateIndex:true
}, (err) => {
    if(!err){
        console.log('MongoDB connected...')
    } else
    {
        console.log('Error in DB connection: ' + JSON.stringify(err, undefined, 2) );
    }
})

const PORT=3000;

 
app.use(cors());
app.use(express.json());
app.use('/api',route,route2,route3,route4,route5,route6,route7);

app.listen(PORT,()=>{
    console.log('server started at port:',PORT);
});