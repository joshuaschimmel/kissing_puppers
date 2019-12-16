const Pupper = require('../models/pupper');

// TODO index page of api?
exports.index = function(req, res, next) {
    let err = new Error('No index page for api found');
    err.status = 404;
    next(err);
}

// Return the next pupper (use cookie?)
exports.next_pupper = function(req, res) {
    res.json({status: "Not implemented!"});
};

// Return a random pupper
exports.random_pupper = function(req, res) {
    res.json({status: "Not implemented!"});
};