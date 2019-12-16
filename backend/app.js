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
const data_json = JSON.parse(
    fs.readFileSync(__dirname + '/data/response5.json', 'utf8')
);
// later for the actual db
// data_json.on('error', console.error.bind(console, 'DB error: '));

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

/*
const server = http.createServer((req, res) => {
    console.log(`request was made: ${req.url} with method ${req.method}`);
    let body = [];
    req.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
    });

    switch (req.method) {
        case 'HEAD':
            //TODO: proper response
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end('Only GET methods are allowed');
            break;
        case 'GET':
            let pupper_datum = data_json[Math.floor(Math.random() * data_json.length)];
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify(pupper_datum));
            res.end();
            break;
        //all other methods are disabled
        default:
            res.writeHead(405, { "Content-Type": "text/plain" });
            res.end(`Error 405: Method ${req.method} is disabled,
                    plese use GET or HEAD.`
            );
    }
});

server.listen(port, hostname, () => {
    console.log(`Server starting up at http://${hostname}:${port}/`);
});
*/