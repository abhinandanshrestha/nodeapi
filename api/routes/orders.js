const express = require('express');
const router = express.Router();

// now , we have to basically tell express to funnel all the request through the morgan middleware
// morgan will log something and then let the request continue

/* 
orders/
get post 
*/
router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'orders were fetched'
    })
})

router.post('/',(req,res,next)=>{
    // The HTTP 201 Created success status response code indicates that the request has succeeded and has led to the creation of a resource
    res.status(201).json({
        message: 'orders were created'
    });
});


/*
/orders/{id}
get delete
*/
router.get('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message: 'Order Details',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message: 'Order Deleted',
        orderId: req.params.orderId
    });
});


module.exports = router;