var express =require('express');
var router5 =express.Router();
const wishlist = require('../model/wishlistmodel')

router5.get('/mywl/:mail',(req,res)=>{
    wishlist.find({userMail:req.params.mail}).then((data)=>{
        res.json(data);
    }).catch(err => console.error(`error occurred: ${err}`));
});

router5.post('/wishlist',(req,res)=>{
    const newlist=new wishlist({
        userMail:req.body.email,
        isbn:req.body.isbn
    });
    newlist.save().then(result=>{
        res.status(201).json({
        message:'book added to list',
        result: result
    });
  })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
          message:""
        });
      });
});


router5.delete('/wishlist/:isbn',(req,res)=>{
    wishlist.deleteOne({isbn:req.params['isbn']}).then((data)=>{
        res.json(data);
    }).catch(err => console.error(`error occurred: ${err}`));
})

module.exports = router5;