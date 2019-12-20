/**
 * Populates the local db with objects from the response.json files
 */
const mongoose = require('mongoose');
const fs = require('fs');
const Pupper = require('./models/pupper');

// setup db
mongoose.connect(
    'mongodb://localhost:27017/kissing_puppers', {
        useNewUrlParser : true,
        useUnifiedTopology: true,

    }
);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB error: '));

// read response.json
let data_array = JSON.parse(fs.readFileSync(__dirname + '/test_data/response5.json', 'utf-8'));

// create new instances for each object
let pupper_array = data_array.map(data => new Pupper({json_datum: data}));

// add them to the db if they do not exist yet
pupper_array.forEach(pupper => pupper.save(function(err, result){
    if(err) {console.error(err);}
    else {console.log('Saved ' + result._id);}
}));

// close connection
// TODO close db after all objects are saved
// db.close();