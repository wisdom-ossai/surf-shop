require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const expressEjsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const router = express.Router();


const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts.route');
const reviewsRouter = require('./routes/reviews.route');
const usersRouter = require('./routes/users.route');

const User = require('./models/user.model');

const app = express();

// Connect to mongoDB
mongoose.connect('mongodb://localhost:27017/surf-shop-mapbox', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
  console.log('connected to mongo!')
  })
  .catch(err => {
    console.error(err);
  });

app.use(expressEjsLayouts);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configure Session
app.use(
  session({
    secret: 'this is going to be my secret stored in .env file',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
// Configure Passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(
  methodOverride('_method')
);

app.use((req, res, next) => {
  res.locals.title = 'Surf Shop';

  res.locals.success = req.session.success || '';
  delete req.session.success;

  res.locals.error = req.session.error || '';
  delete req.session.error;
  next();
})

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/posts/reviews/:id', reviewsRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  req.session.error = err.message;
  res.redirect('back');
});

module.exports = app;
