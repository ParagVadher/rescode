const express = require('express');
const app = express();
const port = 8000;

//use express router - last line from index.js in routes brings it to you
app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`The connection was unsuccessful: ${err}`);
        return;
    };
    
    console.log(`The connection was successful at port: ${port}`);
});