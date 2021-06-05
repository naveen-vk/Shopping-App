var express=require('express');
var router6=express.Router();
const Item=require('../model/cartmodel');

router6.get('/item/:mail',(req, res ) => {
    Item.find({userMail:req.params.mail}).then(documents => {
        res.status(200).json({
            message : 'Posts fetched',
            items : documents 
        });
    });
});
router6.delete("/item/:isbn",(req,res,next) =>{
    Item.deleteOne({isbn: req.params.isbn}).then(result => {
        console.log(result);
        res.status(200).json({message : "Item Removed Successfully "});
    });
});

router6.post("/cart",(req,res)=>{
    const newlist=new Item({
        userMail:req.body.email,
        name:req.body.title,
        pages:req.body.pages,
        quantity:"1",
        thumbnailUrl:req.body.img,
        author:req.body.author,
        price:req.body.price,
        discount:req.body.discount,
        currency:req.body.currency,
        isbn:req.body.isbn
    });
    newlist.save().then(() => {
        res.status(201).json({
          message: "Post added successfully"
        });
      });
    });

router6.get("/cart/:mail",(req,res,next)=>{
    Item.find({userMail:req.params.mail}).then(documents=>{
        console.log(documents);
    res.status(200).json(documents);
});
});

module.exports = router6;