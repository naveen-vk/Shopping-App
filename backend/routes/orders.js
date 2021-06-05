var express=require('express');
var router3=express.Router();
const Order=require('../model/ordersmodel');
const Item=require('../model/cartmodel');



router3.post("/addorder", (req, res, next) => {
    const order = new Order({
        isbn: req.body.isbn,
        productname: req.body.productname,
        email:req.body.email,
        quantity: req.body.quantity,
        price: req.body.price,
        address: req.body.address,
    });
    order.save().then(() => {
      res.status(201).json({
        message: "Order placed sucessfully"
      });
    });
  });


router3.get("/getorder/:status",(req,res,next)=>{
    Order.find({"status":req.params.status}).then(documents=>{
        console.log(documents);
    res.status(200).json({
        message:"orders fetched",
        orders:documents
    });
});
});

router3.get("/orders/:email",(req,res,next)=>{
  
    Order.find({"email":req.params.email }).then(documents=>{
        console.log(documents);
    res.status(200).json({
        message:"orders fetched",
        orders:documents
    });
});
});

router3.post("/updatestatus",(req,res,next)=>{
    const OrderId={"OrderId":req.body.OrderId};
    console.log(OrderId);
    const newstatus={"status":"delivered"};
    Order.updateOne(OrderId,newstatus,function(err,res){
        if(err) throw err;
        console.log("status updated");
    });
});

/*router3.post("/cart",(req,res)=>{
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
    });
    newlist.save().then(() => {
        res.status(201).json({
          message: "Post added successfully"
        });
      });
    });

router3.get("/cart/:mail",(req,res,next)=>{
    Item.find({userMail:req.params.mail}).then(documents=>{
        console.log(documents);
    res.status(200).json(documents);
});
});*/

module.exports = router3;