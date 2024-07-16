const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const seedDB = require("./seed");
const ejsMate = require('ejs-mate');
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const session = require('express-session');  // Added express-session
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');

const productRoutes = require('./routes/products');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

mongoose
  .connect("mongodb://127.0.0.1:27017/shoeping")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: 'your_secret_key',  // Replace with your own secret key
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Seeding DB
// seedDB(); // Uncomment this line only when you want to seed the database

// Passport middleware for auth (available on npm passport website)
passport.use(new LocalStrategy(User.authenticate()));

app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);

app.listen(port, () => {
  console.log(`Server of ShoePing connected`);
});
