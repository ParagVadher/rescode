const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rescode_development');

// mongodb://localhost/rescode_development

// to connect to mongo's prod database
// check exp1 on gdrive for password to prod db

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to db'));

db.once('open', function(){
    console.log('Connected to database :: MongoDB')
});

module.exports = db;