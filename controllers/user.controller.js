
const User = require('../models/user.model');
const passport = require('passport');

module.exports = {
  registerUser: async (req, res, next) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      image: req.body.image
    });
    const result = await User.register(newUser, req.body.password);

    console.log(result);
    res.redirect('/');
  },

  loginUser: async (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: 'login'
    })(req, res, next);
  },

  logoutUser: async (req, res, next) => {
    req.logout();
    res.redirect('/');
  } 
};