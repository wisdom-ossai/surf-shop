var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const passport = require('passport');

const { registerUser, loginUser, logoutUser } = require('../controllers/user.controller');

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', asyncHandler(registerUser));

router.get('/login', function(req, res, next) {
  res.send('GET login for view');
});

router.post('/login', asyncHandler(loginUser));

router.get('/logout', asyncHandler(logoutUser));

router.get('/profile', function(req, res, next) {
  res.send('respond with a User profile');
});

router.put('/profile.:user_id', function(req, res, next) {
  res.send('respond with a User profile update');
});

router.get('/forgot', function(req, res, next) {
  res.send('respond with a Forgot Password');
});

router.put('/forgot', function(req, res, next) {
  res.send('respond with a Forgot Password');
});

router.get('/reset/:token', function(req, res, next) {
  res.send('respond with a Reset Password');
});

router.put('/reset/:token', function(req, res, next) {
  res.send('respond with a Reset Password');
});

module.exports = router;
