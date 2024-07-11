const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const seedDB = require("./seed");
const productRoutes =require('./routes/products');
const reviewRoutes =require('./routes/review');
const ejsMate=require('ejs-mate');
const mongoose = require("mongoose");
const methodOverride = require('method-override')
 
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

mongoose
  .connect("mongodb://127.0.0.1:27017/shoeping")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.engine('ejs', ejsMate)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))

//seeding DB

// seedDB() always comment this after seeding data for one time else it will keep on adding after every change in code

app.use(productRoutes);
app.use(reviewRoutes);






app.listen(port, () => {
  console.log(`Server of ShoePing connected`);
});
