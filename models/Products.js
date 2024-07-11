// Product.js
const mongoose = require('mongoose');
const Review = require('./Review');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    img: {
        type: String,
        required: true,
        trim: true,
    },
    desc: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }]
});

module.exports = mongoose.model('Product', productSchema);
