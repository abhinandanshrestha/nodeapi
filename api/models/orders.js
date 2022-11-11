const mongoose = require('mongoose');

//A Mongoose schema defines the structure of the document, default values, validators, etc.
//whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.
//Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    //we are making relations with Product model and here type acts like a foreign key
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required:true },
    // productId: { type: String, required: true },
    quantity: { type: Number, default: 1 }
})

//name of the model and Schema you want to use for the model
module.exports =  mongoose.model('Order', orderSchema)