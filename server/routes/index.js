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

//create the contact object - represents a document in the contacts collections
let contact = require('../models/contacts');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home'
   });
});

/* GET about page. */
router.get('/about', (req, res, next) => {
  //find all contacts in the contacts collections

  contact.find((err, contacts) => {

    if(err)
    {
      return console.error(err);
    }
    else
    {
      res.render('content/about', {
        title: 'About',
        contacts: contacts
      });
    }
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
router.get('/contact', (req, res, next) => {
  res.render('content/contact', {
    title: 'Contact'
   });
});

module.exports = router;
