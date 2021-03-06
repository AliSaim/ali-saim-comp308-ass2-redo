/* COMP308 - Emerging Technology Assignment One
 * File: index.js
 * Student: Ali Saim (300759480)
 * Date Created: Feb 5th 2017
 * Date Last Modified: March 10th 2017
 * Description: index.js is used to route to different pages/tabs
 * Revision History:
 *  Feb 05, 2017:
 * 					Created index.js
 * Feb 10, 2017:
 *          Added internal documentation
 * Mar 10, 2017:
 *          Added routes to projects, and required porject modules for Auth
 */

//import the express object
let express = require('express');

//create the router for our application
let router = express.Router();

//import mongoose NPM package
let mongoose = require('mongoose');
let passport = require('passport');

//define the user models
let UserModel = require('../models/users');
let User = UserModel.User; //alias for User

//define the contact model
//create the contact object - represents a document in the contacts collections
let contact = require('../models/contacts');

// create a function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged in
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    displayName: req.user ? req.user.displayName : '',
    contacts: ''
   });
});


/* GET projects page. */
router.get('/projects', (req, res, next) => {
  res.render('content/projects', {
    title: 'Projects',
    displayName: req.user ? req.user.displayName : ''
    
   });
});

/* GET services page. */
router.get('/services', (req, res, next) => {
  res.render('content/services', {
    title: 'Services',
    displayName: req.user ? req.user.displayName : ''
   });
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('content/contact', {
    title: 'Contact',
    displayName: req.user ? req.user.displayName : ''
   });
});

//GET / login - render the login view
router.get('/login', (req, res, next) => {
  //check to see if the user is already looged in
if(!req.user)
{
//render the login page
res.render('auth/login', {
title: 'Login',
contacts: '',
messages: req.flash('loginMessage'),
displayName: req.user ? req.user.displayName : ''
});
return;
}
else
{
  return res.redirect('/contacts'); //redirect to the contact list
}
});

//POST / login - process the login page
router.post('/login', passport.authenticate('local', {
  successRedirect: '/contacts',
  failureRedirect: '/login',
  failureFlash: true
}));

//GET /register - render the register page
router.get('/register', (req, res, next) => {
  //check if the user is not already logged in
  if(!req.user)
  {
    //render the registration page
    res.render('auth/register', {
    title: 'Register',
    contacts: '',
    messages: req.flash('registerMessage'),
    displayName: req.user ? req.user.displayName : ''
    }); 
  }
});


//POST /register - process the registeration view
router.post('/register', (req, res, next) => {
  User.register(new User({
      username: req.body.username,
      //password: req.body.password,
      email: req.body.email,
      displayName: req.body.displayName
    }),
    req.body.password,
    (err) => {
      if(err)
      {
        console.log('Error inserting new user');
        if(err.name == 'UserExistsError')
        {
          req.flash('registerMessage', 'Registration Error: User Already Exists!');
        }
        return res.render('auth/register', {
        title: 'Register',
        contacts: '',
        messages: req.flash('registerMessage'),
        displayName: req.user ? req.user.displayName : ''
        }); 

      }
      //if registration is successful
      return passport.authenticate('local')(req, res, () => {
        res.redirect('/contacts');
      });
      
    });
});

//GET /logout - loutgout the user and redirect to the homepage
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/'); //redirect to the homepage
});

module.exports = router;
