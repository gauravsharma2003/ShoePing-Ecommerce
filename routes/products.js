const express =require('express');
const Product = require('../models/Products');
const router=express.Router();  //it is a mini instance 


router.get('/products', async(req, res)=>{
  let products= await Product.find({})
    res.render('products/index', {products});
});






module.exports=router;
