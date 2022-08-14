module.exports.home = function(req, res){
    // return res.end('<h1>This is the home controller routed through routes!</h1>');
    return res.render('home', {
        title: "Home"
    });
};

module.exports.gamefeed = function(req, res){
    return res.end('<h1>should have played a game here, this runs from a statemet in routes/index.js that fetches a homecontroller function directly</h1>');
};