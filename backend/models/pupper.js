const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PupperSchema = new Schema({
    json_datum: Object
});

module.exports = mongoose.model('Pupper', PupperSchema);