const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rescode_development');

// mongodb://localhost/rescode_development

// to connect to mongo's prod database
// mongodb+srv://Paragv0:mLrlQv85Yx6iGa5r@rescode.rzpgtil.mongodb.net/?retryWrites=true&w=majority
// Paragv0
// mLrlQv85Yx6iGa5r

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to db'));

db.once('open', function(){
    console.log('Connected to database :: MongoDB')
});

module.exports = db;