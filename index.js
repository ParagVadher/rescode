const express = require('express');
const app = express();
const port = 8000;

app.listen(port, function(err){
    if(err){
        console.log(`The connection was unsuccessful: ${err}`);
        return;
    };
    
    console.log(`The connection was successful at port: ${port}`);
});