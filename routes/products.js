const express = require('express');
const Product = require('../models/Products');
const router = express.Router();  // it is a mini instance 
const {validateProduct}=require('../middleware')

// To show all the products
router.get('/products', async (req, res) => {
  try {
    let products = await Product.find({});
    res.render('products/index', { products });
  } catch (err) {
    res.status(500).render('error', { error: err });
  }
});

// To show the form to add the products 
router.get('/product/new', (req, res) => {
  try {
    res.render('products/new');
  } catch (err) {
    res.status(500).render('error', { error: err });
  }
});

// To add the products in db which came from the form above
router.post('/products', validateProduct, async (req, res) => {
  try {
    let { name, img, desc, price } = req.body;
    await Product.create({ name, img, desc, price });
    res.redirect('/products');
  } catch (err) {
    res.status(500).render('error', { error: err });
  }
});

// To show a specific product
router.get('/products/:id', async (req, res) => {
  try {
    let { id } = req.params;
    let FoundProduct = await Product.findById(id).populate('reviews');
    res.render('products/show', { FoundProduct });
  } catch (err) {
    res.status(500).render('error', { error: err });
  }
});

// To show the form to edit a specific product
router.get('/products/:id/edit', async (req, res) => {
  try {
    let { id } = req.params;
    let FoundProduct = await Product.findById(id);
    res.render('products/edit', { FoundProduct });
  } catch (err) {
    res.status(500).render('error', { error: err });
  }
});

// To edit the data in db from above form
router.patch('/products/:id', validateProduct, async (req, res) => {
  try {
    let { id } = req.params;
    let { name, img, desc, price } = req.body;
    await Product.findByIdAndUpdate(id, { name, img, desc, price });
    res.redirect(`/products/${id}`);
  } catch (err) {
    res.status(500).render('error', { error: err });
  }
});

// To delete the item
router.delete('/products/:id', async (req, res) => {
  try {
    let { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
  } catch (err) {
    res.status(500).render('error', { error: err });
  }
});

module.exports = router;
