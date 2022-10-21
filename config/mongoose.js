const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Paragv0:WISc6ypuOhrAN3Pv@rescode0.qyqiydk.mongodb.net/?retryWrites=true&w=majority');

// to connect to mongo's prod database
// mongodb+srv://Paragv0:mLrlQv85Yx6iGa5r@rescode.rzpgtil.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://Paragv0:<password>@rescode0.qyqiydk.mongodb.net/?retryWrites=true&w=majority
// WISc6ypuOhrAN3Pv
// Paragv0
// mLrlQv85Yx6iGa5r

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to db'));

db.once('open', function(){
    console.log('Connected to database :: MongoDB')
});

module.exports = db;