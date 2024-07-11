const express = require('express');
const Product = require('../models/Products');
const router = express.Router();  // it is a mini instance 

// To show all the products
router.get('/products', async (req, res) => {
  let products = await Product.find({});
  res.render('products/index', { products });
});

// To show the form to add the products 
router.get('/product/new', (req, res) => {
  res.render('products/new'); 
});
//to add the prodcuts in db which came from the form from above form
router.post('/products',async(req, res)=>{
   let {name,img, desc, price }=req.body;
   await Product.create({name, img, desc, price});
   res.redirect('/products');
});

//to show a specific product
router.get('/products/:id',async(req, res)=>{
  let{id}=req.params;
  let FoundProduct=await Product.findById(id);
  res.render('products/show',{FoundProduct})
})

//to edit a specific product

router.get('/products/:id/edit',async(req, res)=>{
  let{id}=req.params;
  let FoundProduct=await Product.findById(id);
  res.render('products/edit',{FoundProduct});
})

//to edit the data in db from above form

router.patch('/products/:id', async(req, res)=>{
  let{id}=req.params;
  let {name,img, desc, price }=req.body;
  await Product.findByIdAndUpdate(id,{name,img, desc, price });
  res.redirect(`/products/${id}`);
});

// to delete the item

router.delete('/products/:id', async(req, res)=>{
  let{id}=req.params;
  await Product.findByIdAndDelete(id);
  res.redirect('/products');
})


module.exports = router;
