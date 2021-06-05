var express =require('express');
var router7 =express.Router();
const review = require('../model/reviewsmodel')

router7.get('/myreview/:isbn',(req,res)=>{
    review.find({isbn:req.params.isbn}).then((data)=>{
        res.json(data);
    }).catch(err => console.error(`error occurred: ${err}`));
});

router7.post('/reviews',(req,res)=>{
    const newlist=new review({
        userMail:req.body.email,
        isbn:req.body.isbn,
        review:req.body.review,
        rating:req.body.rating,
        userName:req.body.username
    });
    newlist.save().then(result=>{
        res.status(201).json({
        message:'review added',
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


module.exports = router7;