const express = require('express');
const app = express();

//Setup the product routes for which requests will be handled by ./api/routes/product.js
const productRoutes = require('./api/routes/products');
app.use('/products', productRoutes);

//Setup the order routes for which requests will be handled by ./api/routes/order.js
const orderRoutes = require('./api/routes/orders');
app.use('/orders',orderRoutes);

//using the HTTP logger middleware 'morgan'
const morgan = require('morgan');
app.use(morgan('dev'));

//Error handling for routes that don't have router handler
app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

//For handling unknown errors
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports = app;