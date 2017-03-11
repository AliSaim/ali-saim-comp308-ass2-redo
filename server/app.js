/* COMP308 - Emerging Technology Assignment One
 * File: app.js
 * Student: Ali Saim (300759480)
 * Date Created: Feb 5th 2017
 * Date Last Modified: Feb 10th 2017
 * Description: app.js is a class used to connect to the server
 * Revision History:
 *  Feb 05, 2017:
 * 					Created app.js
 * Feb 10, 2017
 *          Added internal documentation
 */

//moudle inclusion/requirments/ dependencies
let express = require('express');
let path = require('path'); // part of node.js core
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

//modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require("passport-local");
let LocalStrategy = passportLocal.Strategy;
let flash = require('connect-flash'); //display errors/ login messages


//adding the mongoose module
let mongoose = require('mongoose');
//connect to mongoDB and use the contacts database

//import the config module
let config = require('./config/db');


//connect to the Mongo db using the URI above
mongoose.connect(process.env.URI || config.URI);

//create a db object and make a reference the connection
let db = mongoose.connection;

//listen for a successful connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected to MongoDB...");
});


let index = require('./routes/index');
let contacts = require('./routes/contacts');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

//setup sessions
app.use(session({
  secret: "Joker420",
  saveUninitialized: true,
  resave: true
}));


//initialize passport and flash
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


//route redirects
app.use('/', index);
app.use('/contacts', contacts);

//Passport user configuration
let UserModel = require('./models/users');
let User = UserModel.User;
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Handle 404 Errors
  app.use(function(req, res) {
      res.status(400);
      res.render('errors/404',{
      title: '404: File Not Found'
    });
  });

  // Handle 500 Errors
  app.use(function(error, req, res, next) {
      res.status(500);
      res.render('errors/500', {
        title:'500: Internal Server Error',
        error: error
      });
  });

module.exports = app;
