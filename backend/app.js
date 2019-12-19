/**
 * Dependencies
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const fs = require('fs');

const apiRouter = require('./routes/api');


let app = express();

/**
 * Setup database
 */
mongoose.connect(
    'mongodb://localhost/kissing_puppers',
    {useNewUrlParser : true}
);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB error: '));

/**
 * Setup middleware and routing
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// use static file for index page
app.use(express.static(path.join(__dirname, '../frontend/build')));
// app.use('/', indexRouter);
app.use('/api', apiRouter)

// catch all other routes as 404
app.use(function(req, res, next){
    next(createError(404));
});

// catch and handle errors thrown in middleware functions (next(err))
app.use(function(err, req, res, next) {
    // set locals, only providing error in develoment
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;