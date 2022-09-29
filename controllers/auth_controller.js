module.exports.login = function(req, res){
    // return res.end('<h1>This is the home controller routed through routes!</h1>');
    return res.render('login', {
        title: "Login"
    });
};

module.exports.signup = function(req, res){
    // return res.end('<h1>This is the home controller routed through routes!</h1>');
    return res.render('signup', {
        title: "Register"
    });
};