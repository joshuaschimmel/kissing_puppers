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
exports.random_pupper = function(req, res, next) {
    Pupper.countDocuments().exec(function(err, count){
        if(err) {return next(err);}
        const random = Math.floor(Math.random() * count);
        
        Pupper.findOne().skip(random).exec(
            function(err, result){
                if(err) {return next(err);}
                if(result === null) {
                    error = new Error("Resource not found!");
                    error.status = 404;
                    return next(err);
                }
                res.json(result);
            });
    });
    
};