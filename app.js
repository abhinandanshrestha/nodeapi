const express = require('express');
const app = express();

//using data-parser to parse the incoming requests
const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
app.use(bodyParser.json());

app.use((req,res,next) => {
    //Allow access to your api from any orign * || you can restrict that to your website only
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    //restrict methods to only put,post, patch & delete
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE')
        return res.status(200).json({});
    }

    next();
})



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