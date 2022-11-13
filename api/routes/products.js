const express = require('express');
const router = express.Router();
/*
/products
GET post
*/
router.get('/',(req,res,next)=>{
    //The HTTP 200 OK success status response code indicates that the request has succeeded ,json() helps to send json response, we can add message to it as
    // res.status(200).json({
    //     message: 'Handling GET requests to /products'
    // })
    Product.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err=>{
            console.log(err);
            res.status(200).json({
                error: err
            })
        })
})


const mongoose = require('mongoose')
const Product =  require('../models/products')

//Alternative approach to body parser is to use multer for file uploading
const multer = require('multer');

const storage= multer.diskStorage({
    destination: function(req,file,cb){
        //cb(error,destination)
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        //cb(error,filename)
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage:storage,
    limits: 1024*1024*5, //5MB limits at max
    fileFilter: function(req,file,cb){
        if (file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
            cb(null,true);
        }else{
            cb(null,false);
        }
    }
})

router.post('/',upload.single('productImage'),(req,res,next)=>{

    // req.file is the `productImage` file
    // req.body will hold the text fields, if there were any

    console.log(req.file)

    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });

    //now we can save it to the database
    product.save().then((result) =>{
        console.log(result);
        res.status(201).json({
            message: 'Handling POST requests to /products',
            createdProduct: result
        })
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({
            error:err
        }); // 500 error represents server encountered an unexpected condition that prevented it from fulfilling the request. 
    });


})



/*/products/{id}
GET patch(update) delete
*/
router.get('/:productId',(req,res,next)=>{
    //extract productId from params /products/1    i.e    id=1
    const id = req.params.productId;

    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc){
                res.status(200).json(doc);
            }else{
                res.status(404).json({
                    message: 'No valid entry found for the provided ID'
                });
            }
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});

router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    const updateOp = req.body;
    Product.update({_id: id},{$set:updateOp}).exec().then(result=>{
        console.log(result);
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    }); //The $set operator replaces the value of a field with the specified value.
});


router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.remove({
        _id:id
    }).exec()
        .then(res=>{
            res.status(200).json(res);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
});


module.exports = router;