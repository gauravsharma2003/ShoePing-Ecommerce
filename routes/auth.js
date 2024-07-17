const express = require('express');
const User = require('../models/User');
const passport = require('passport');
const router = express.Router();


//signup
router.get('/register', (req, res)=>{
    res.render('auth/signup')
})
router.post('/register', async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const user=new User({username, email})
      const newUser=await User.register(user, password)
      res.redirect('/login');
    } catch (err) {
      res.status(500).render('error', { error: err });
    }
  });


  //login
router.get('/login', (req, res)=>{
    res.render('auth/login')
})

router.post('/login',passport.authenticate('local', { failureRedirect: '/login' }), (req, res)=>{
     res.redirect('/products')
})


//logout
router.get('/logout',(req, res)=>{
    ()=>{
        req.logOut();
    }
    res.redirect('/login')

})


module.exports = router;