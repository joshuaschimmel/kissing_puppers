let express = require('express');
let router = express.Router();

// import controller modules
let api_controller = require('../controllers/apiController');

// Handle GET index
router.get('/', api_controller.index);

// Handle GET next pupper json
router.get('/next_pupper', api_controller.next_pupper);

// Handle GET random pupper json
router.get('/random_pupper', api_controller.random_pupper);

module.exports = router;