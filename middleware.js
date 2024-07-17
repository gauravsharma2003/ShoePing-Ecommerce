
const { productSchema, reviewSchema,} = require('./schema');

const validateProduct = (req, res, next) => {
  let { name, img, price, desc } = req.body;
  const { error } = productSchema.validate({ name, img, price, desc });
  if (error) {
    return res.status(400).render('error', { error: error.details[0].message });
  }
  next();
}

const validateReview = (req, res, next) => {
  let { rating, comment } = req.body;
  const { error } = reviewSchema.validate({ rating, comment });
  if (error) {
    return res.status(400).render('error', { error: error.details[0].message });
  }
  next();
}

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
};


module.exports = { validateProduct, validateReview ,isLoggedIn};
