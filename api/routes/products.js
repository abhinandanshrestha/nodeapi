const express = require('express');
const router = express.Router();

/*
/products
GET post
*/
router.get('/',(req,res,next)=>{
    //The HTTP 200 OK success status response code indicates that the request has succeeded ,json() helps to send json response, we can add message to it as
    res.status(200).json({
        message: 'Handling GET requests to /products'
    })
})

router.post('/',(req,res,next)=>{
    res.status(201).json({
        message: 'Handling POST requests to /products'
    })
})



/*/products/{id}
GET patch(update) delete
*/
router.get('/:productId',(req,res,next)=>{
    //extract productId from params /products/1    i.e    id=1
    const id = req.params.productId;
    if (id==='special'){
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    }else{
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:productId',(req,res,next)=>{
    res.status(200).json({
        message: 'Updated product!'
    });
});


router.delete('/:productId',(req,res,next)=>{
    res.status(201).json({
        message: 'Deleted product!'
    });
});


module.exports = router;