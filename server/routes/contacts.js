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
      res.render('contacts/index', {
        title: 'Contacts',
        contacts: contacts
      });
    }
});

});


/* GET edit - show current contact to edit. */
router.get('/:id', (req, res, next) => {

    //get a refernece to the id of the contact to editg
    let id =req.params.id;

  //find the contact to edit by it's id in the contacts collections
  contact.findById(id, (err, contacts) => {

    if(err)
    { 
      console.error(err);
      res.end(error);
    }
    else
    {
        //show the edit view
      res.render('contacts/details', {
        title: 'Contacts Details',
        contacts: contacts
      });
    }
});

});



/* POST edit - process the contact to edit. */
router.post('/:id', (req, res, next) => {

    //get a refernece to the id of the contact to editg
    let id =req.params.id;

    let contacts = new contact({
      "_id": id,
      "name": req.body.name,
      "age": req.body.age,
      "phone": req.body.phone
    });


    contact.update({_id: id}, contacts, (err) => {
      if(err)
      {
        console.log(err);
        res.end(error);
      }
      else
      {
        res.redirect('/contacts');
      }
    });

});





module.exports = router;