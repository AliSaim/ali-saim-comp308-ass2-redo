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

//GET add page - show the blank details pages
router.get('/add', (req, res, next) =>{
  res.render('contacts/details', {
    title: 'Add a new Contact',
    contacts: ''
  });
});

//POST add page - save the Contact to the db
router.post('/add', (req, res, next) => {
  contact.create({
    "name": req.body.name,
    "age": req.body.age,
    "phone": req.body.phone
  }, (err, contact) => {
    if(err) 
    {
        console.log(err);
        res.end(err);
    }
    else
    {
      res.redirect('/contacts');
    }
  });
});


/* GET edit - show current contact to edit. */
router.get('/:id', (req, res, next) => {

    try
    {
        //get a refernece to the id of the contact to editg
        let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

        //find the contact to edit by it's id in the contacts collections
        contact.findById(id, (err, contacts) => {

        if(err)
        { 
          console.log(err);
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
      }

      catch (err)
      {
          console.log(err);
          res.redirect('/errors/404');
      }
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


//GET delete - should delete by id
router.get('/delete/:id', (req, res, next) => {

  //get a reference to the id of the contact to edit
  let id = req.params.id;

  contact.remove({_id: id}, (err) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('/contacts');
    }
  });
});




module.exports = router;