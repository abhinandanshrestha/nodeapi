const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//import Order model from the models/orders.js
const Order = require('../models/orders')
const Product = require('../models/products')


// now , we have to basically tell express to funnel all the request through the morgan middleware
// morgan will log something and then let the request continue

/* 
orders/
get post 
*/
router.get('/',(req,res,next)=>{
    Order.find()
        .populate('product') //populate can be used to display all information related to orders as we have productId as foreign key to orderSchema
        .exec()
        .then(docs=>{
            res.status(200).json(docs)
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })
})

router.post('/',(req,res,next)=>{

    // const order = {
    // productId: req.body.name,
    // quantity: req.body.quantity

    //check if the product exist or not then perform the post request
    Product.findById(req.body.productId).then(product=>{

        if (!product){
            return res.status(404).json({
                message: "Product not found"
            })
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });

        order.save().then(result=>{
                console.log(result);
                res.status(201).json(result);
            }).catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
    })
        .catch(err=>{
            res.status(500).json({
                error: err
            })
        });

    });


/*
/orders/{id}
get delete
*/
router.get('/:orderId',(req,res,next)=>{
    Order.findById(req.params.orderId)
        .populate('product')
        .exec()
        .then(order=>{
            if(!order){
                return res.status(404).json({
                    message: "Order not found"
                })
            }
            res.status(200).json(
                {order: order}
            ).catch(err=>{
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
        })
});

router.delete('/:orderId',(req,res,next)=>{
    Order.remove({ _id: req.params.orderId }).exec()
        .then(result=>{
            res.status(200).json({
                message: 'Order deleted',
                request:{
                    type: 'DELETE'
                }
            })
        }).catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});


module.exports = router;