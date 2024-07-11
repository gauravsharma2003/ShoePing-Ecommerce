const Product = require('../models/Products');
const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

// Adding a review to a specific product
router.post('/products/:id/review', async (req, res) => {
    let { id } = req.params;
    let { rating, comment } = req.body;
    const product = await Product.findById(id);
    const review = new Review({ rating, comment });
    product.reviews.push(review);
    await review.save();
    await product.save();
    res.redirect(`/products/${id}`);
});

module.exports = router;