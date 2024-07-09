const mongoose=require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    img:{
        type:String,
        required:true,
        trim:true,
    },
    desc:{
        type:String,
        // required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
        trim:true,
        min:0,
    },

})

let Product = mongoose.model('Product', productSchema);
module.exports=Product;
