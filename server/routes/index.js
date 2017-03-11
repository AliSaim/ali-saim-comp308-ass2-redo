/* COMP308 - Emerging Technology Assignment One
 * File: index.js
 * Student: Ali Saim (300759480)
 * Date Created: Feb 5th 2017
 * Date Last Modified: Feb 10th 2017
 * Description: index.js is used to route to different pages/tabs
 * Revision History:
 *  Feb 05, 2017:
 * 					Created index.js
 * Feb 10, 2017
 *          Added internal documentation
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
    return res.redirect('auth/login');
  }
  next();
}

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home'
   });
});


/* GET projects page. */
router.get('/projects', (req, res, next) => {
  res.render('content/projects', {
    title: 'Projects'
   });
});

/* GET services page. */
router.get('/services', (req, res, next) => {
  res.render('content/services', {
    title: 'Services'
   });
});

/* GET contact page. */
router.get('/contact', requireAuth, (req, res, next) => {
  res.render('content/contact', {
    title: 'Contact'
   });
});

module.exports = router;
