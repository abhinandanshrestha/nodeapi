const express = require('express');
const app = express();

//The HTTP 200 OK success status response code indicates that the request has succeeded ,json() helps to send json response, we can add message to it as
// app.use((req,res,next)=>{
//     res.status(200).json({
//         message: 'It works!'
//     })
// })


//Setup the product routes which will be handled by ./api/routes/product.js
/*
/products
GET post

/products/{id}
GET patch(update) delete
*/
const productRoutes = require('./api/routes/products');
app.use('/products', productRoutes);

const orderRoutes = require('./api/routes/orders');
app.use('/orders',orderRoutes);

module.exports = app;