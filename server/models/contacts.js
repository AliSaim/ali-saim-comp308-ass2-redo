//import the mongoose npm package
let mongoose = require('mongoose');

//create a model class
let contactsSchema = mongoose.Schema({
    name: String,
    age: Number,
    phone: String
},
{
    collection: "contacts"
});

module.exports = mongoose.model('contacts', contactsSchema);

