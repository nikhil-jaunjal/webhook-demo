const express = require('express');
const request = require('request');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const demoRoutes = require('./routes/Demo');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/demodb', {useMongoClient:true});
mongoose.set('useCreateIndex', true);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*'); // in future allow only for leoroc apps, by putting urls. video- 5 parsing the body @11:00
    res.header('Access-Control-Allow-Headers','*');// Origin,X-Requested-With,Content-Type,Accept,Authorization
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH');
        res.status(200).json({});
    }
    next();
});

app.use('/demo', demoRoutes);

app.use((req,res,next) => {
    const error = new Error('page not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    });
});

module.exports = app;