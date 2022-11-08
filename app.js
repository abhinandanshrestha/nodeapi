const express = require('express');
const app = express();

//Setup the product routes which will be handled by ./api/routes/product.js
const productRoutes = require('./api/routes/products');
app.use('/products', productRoutes);

const orderRoutes = require('./api/routes/orders');
app.use('/orders',orderRoutes);

module.exports = app;