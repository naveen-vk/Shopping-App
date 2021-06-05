var express=require('express');
 
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
var router=express.Router();
const user=require('../model/usermodel');
 
// router.get('/users',(req,res,next)=>{
//    user.find(function(err,users){
//        if(err){
//            res.json(err);
//        }else{
//            res.json(users);
//        }
//    });
// });

//saving user
router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        const newuser=new user({
            username:req.body.username,
            phnnumber:req.body.phnnumber,
            email:req.body.email,
            password:hash
        });
      newuser.save().then(result=>{
          res.status(201).json({
          message:'user created',
          result: result
      });
    })
      .catch(err=>{
          res.status(500).json({
            message:"Email already exists"
          });
        });
    });
 });


 
 router.post("/login",(req,res,next)=>{
    let fetchedUser;
   user.findOne({email: req.body.email})
   .then(user=>{
       console.log(user);
       if(!user){
           res.status(401).json({
               message:"Invalid User"
           });
       }
       fetchedUser = user;
       return bcrypt.compare(req.body.password,user.password)
   })
   .then(result=>{
      
       if(!result){
        res.status(401).json({
            message:"Invalid Password"
       });
       }
    const token=jwt.sign({email:fetchedUser.email},'secret_this_should_be_longer',
    {expiresIn:"1h"});
    res.status(200).json({
     token:token,
     expiresIn:3600,
     emailId:fetchedUser.email
    });
    
   })
   .catch(err=>{
    res.status(401).json({
        message:"Invalid authentication credentials"
   });
 });
});


//yash

router.post('/getuserbyemail',(req,res)=>{         //getting data from email
    try{
        user.find({email : req.body.email},(err,data)=>{
            if (err) {
                console.log(err);
                res.send(err)
             } 
            else{
                res.json(data)
            }
        })
    }
    catch{
        res.send("No data")
    }
    
})


router.put("/getuser",(req,res,next)=>{
    const products=req.body.data;
    const isbn = {"_id":req.body.id};
    console.log(products);
    user.updateOne(isbn,products,function(err,res){
      if(err) throw err;
      console.log("profile updated");
  });
   })
      
// router.get('/getUser/:id').get((req, res) => {
//     user.findById(req.params.id, (error, data) => {
//       if (error) {
//         return next(error)
//       } else {
//         res.json(data)
//       }
//     })
//   })  


  router.get('/getuser/:id',(req,res)=>{      // for update purpose only
    try{
        user.findOne({_id :req.params.id},(err,data)=>{
            if (err) {
                console.log(err);
                res.send(err)
             } 
            else{
                res.json(data)
            }
        })
    }
    catch{
        res.send("No data")
    }
    
})

module.exports = router;