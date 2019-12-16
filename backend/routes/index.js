let express = require('express');
let router = express.Router();

// import controller modules
let api_controller = require('../controllers/apiController');

// GET kissing puppers home page
router.get('/', (req, res, next) => {
    // return static files
    res.send('NOT IMPLEMENTED!');
})

// Handle request to api
router.get('/api/next_pupper', api_controller.next_pupper);