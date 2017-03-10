//import the express object
let express = require('express');

//create the router for our application
let router = express.Router();

//import mongoose NPM package
let mongoose = require('mongoose');

//create the contact object - represents a document in the contacts collections
let contact = require('../models/contacts');

/* GET main contacts page. */
router.get('/', (req, res, next) => {
  //find all contacts in the contacts collections

  contact.find((err, contacts) => {

    if(err)
    {
      return console.error(err);
    }
    else
    {
      res.render('content/contactlist', {
        title: 'Contacts',
        contacts: contacts
      });
    }
});


});



module.exports = router;