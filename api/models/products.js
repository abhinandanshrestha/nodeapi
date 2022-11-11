const mongoose = require('mongoose');

//A Mongoose schema defines the structure of the document, default values, validators, etc.
//whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.
//Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true }
})

//name of the model and Schema you want to use for the model
module.exports =  mongoose.model('Product', productSchema)