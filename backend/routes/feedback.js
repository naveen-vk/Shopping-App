const express=require('express');
var router4=express.Router();
var feedback=require('../model/feedback');


router4.get("/getfeedback/:status",(req,res,next)=>{
    feedback.find({"status":req.params.status}).then(documents=>{
        console.log(documents);
    res.status(200).json(
        documents
);
});
});
router4.post('/feedback',(req,res,next)=>{
    var emp=new feedback({
        name:req.body.name,
        email:req.body.email,
        subject:req.body.subject,
        desc:req.body.desc
    });
    emp.save().then(result=>{
        res.status(201).json({
        message:'feedback submitted',
        result: result
        })
}).catch(err=>{
    res.status(500).json({
        message:"error in sending feedback"
    });
});
});

router4.post("/feedbackstatus",(req,res,next)=>{
    const email={"email":req.body.email};
    console.log(email);
    const newstatus={"status":"Resolved"};
    feedback.updateOne(email,newstatus,function(err,res){
        if(err) throw err;
        console.log("status updated");
    });
});
module.exports= router4;