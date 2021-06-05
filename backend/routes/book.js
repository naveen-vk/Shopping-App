var express=require('express');
var router2=express.Router();
const Products=require('../model/bookmodel');

router2.get('/:isbn',(req,res)=>{
  Products.findOne({isbn:req.params['isbn']}).then((data)=>{
      res.json(data);
  }).catch(err => console.error(`error occurred: ${err}`));
});


router2.post("/admin",(req,res,next)=>{
     const newProducts=new Products(req.body
    );
        console.log(newProducts);
        newProducts.save().then(result=>{
          res.status(201).json({
          message:'book added',
          result: result
      });
    })
      .catch(err=>{
          res.status(500).json({
            message:"error"
          });
        });
    });


    router2.put("/updateproduct",(req,res,next)=>{
      const products=req.body.obj;
      const isbn = {"isbn":req.body.id};
      console.log(isbn);
      Products.updateOne(isbn,products,function(err,res){
        if(err) throw err;
        console.log("product updated");
    });
     })
        
  

  router2.get('/getbooks',(req,res,next)=>{
    Products.find({},(err,products)=>{
      if(err){
        res.status(500).json({message:err});
      }
      res.status(200).json(products);
    });
  });

  router2.get('/getbooks/:isbn',(req,res,next)=>{
    Products.find({isbn: req.params.isbn },(err,products)=>{
      if(err){
        res.status(500).json({message:err});
        console.log(err);
      }
      res.status(200).json(products);
    });
  });
  

/*router2.post('/search',function(req,res){
  var query=req.body.title;
  Products.find({title:{$regex:query,$options:'i'}},function(error,words){
    if(error){
      return res.status(400).send({message:"error occured"});
    }
    return res.status(200).send(words);
  }).limit(5);
});*/

router2.post('/search', function(req, res) {
  var query= req.body.title;
  query.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, "\\$&");
    Products.find({title:{$regex:query,$options:'xi'}}, function(error, words){
      if(error) {
        console.log(error)
        return res.status(400).send({msg:"error occurred"});
      }
      return res.status(200).send(words);
    }).limit(5);
});

router2.delete("/deleteBook/:isbn",(req, res, next) => {
  Products.deleteOne({ isbn: req.params.isbn }).then(result => {
    console.log(result);
    res.status(201).json({ message: "Book deleted!" });
  });
});



    module.exports = router2;