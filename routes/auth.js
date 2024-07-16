const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/register', (req, res)=>{
    res.render('auth/signup')
})
router.post('/register', async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const user=new User({username, email})
      const newUser=await User.register(user, password)
      res.send(newUser);
    } catch (err) {
      res.status(500).render('error', { error: err });
    }
  });


module.exports = router;