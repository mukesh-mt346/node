const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('./db/dbconfig');
const mongoose = require("mongoose");
const swagger_ui = require('swagger-ui-express');
const constants = require('./utils/constants');
const cors = require('cors');

// mongoose.Promise = global.Promise;
//Routes definitions
const productsRoutes = require('./apis/routes/products');
const orderRoutes = require('./apis/routes/orders');
const userRoutes = require('./apis/routes/user');
// const { application } = require('express');

// configurations
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//cors allow access to the client side-channels
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.status(200).json({});
    }
    next();
})
app.use('/swagger.api', swagger_ui.serve, swagger_ui.setup(constants.swagger_spec));
app.use('/swagger.api.docs',express.static('./node_modules/swagger-ui-dist'));
app.use(cors());
app.use(express.json())

app.use('/products', productsRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);


// no mapping error handler
app.use((req, res, next) => {
    const e = new Error('Not Found');
    e.status = 404;
    next(e)
   // res.status(200).json({ message: 'this works!' });
});

// application error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500 );
    res.json({error: { message: 'Error: ' + error.message }});
});


// ----------------------------------------------------------------
module.exports = app;