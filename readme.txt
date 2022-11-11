The following routes has to be created

    /products
    GET post

    /products/{id}
    GET patch(update) delete

    /orderes
    get post 

    /orders/{id}
    get delete

#UPPERCASE 
#lowercase for protected users(should be logged in)




Branches:
*1> Basic foundation: branch --> basics
    *1> npm init
    *2> Enter various fields which will create package.json
    *3> npm install --save express   ### --save creates an entry of express in dependencies in package.json file
    *4> Continue tutorial

*2> Nodemon: branch --> nodemon setup
    *1> npm install --save-dev nodemon 
        /*
            --save-dev is used to save the package for development purpose. Example: unit tests, minification..
            --save is used to save the package required for the application to run.
                */
    *2> Installation of nodemon globally:
            if we use npm install -g nodemon,
                simply use: nodemon server.js
        Installation of nodemon as --save-dev requires the following configurations:
            *1> npm install --save-dev nodemon 
            *2> go to package.json
            *3> add scripts as:
                "scripts": {
                    "test": "echo \"Error: no test specified\" && exit 1",
                    "start": "nodemon server.js"
                },
            *4> npm start 
                // simply npm start will run the server

//code has been added after using morgan
*3> Morgan: branch --> morgan setup
    *1> Morgan is HTTP request logger middleware for node.js
        we have to tell express to funnel all the request through the morgan middleware
        then, morgan will log something and then let the request continue
    *2> Morgan behind the scenes will call 'next' function i.e (req,res,next) saying I don't return a response 
        but I made a log where you can continue doing your work.
    *3> HTTP logger can be used for handling errors
    *4> npm install --save morgan
    *5> open app.js:
        //use morgan
        const morgan = require('morgan');
        app.use(morgan('dev'));

*4> body-parser: branch -->bodyparser
    *1> parse the body of incoming request because by default it's not nicely formatted and readable.
    *2> npm install --save body-parser
    *3> doesn't support files but does support
    *4> but supports URL encoded bodies & JSON data
    
*5> CORS handling 
    Note: 
	*1> By default the only allowed url is the same origin you come from.
	*2> If we have to make requests from different origins, we need to specify origin that are allowed.
	*3> Also by default, allowed methods are all & any like GET, POST, PUT, etc.
    *4> But we can specific OPTIONS method to only allow GET & POST.

*6> Database -> branch mongodb mongoose
    Mongodb: Database -> www.mongodb.com
    Mongoose: package to work with the database

    npm install --save mongoose

    const mongoose = require('mongoose');

    //mongoose.connect('<tyo chai site ma hunxa connect your application ma>')
    mongoose.connect('mongodb+srv://abhinandanshrestha:<password>@noderest.sdv5uqn.mongodb.net/?retryWrites=true&w=majority')

    mongoose1 --> basic get handling for Product
    mongoose2 --> Mongoose handling Orders