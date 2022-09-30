// login page controller
module.exports.login = function(req, res){
    return res.render('login', {
        title: "rescode | Login"
    });
};

// register page controller
module.exports.signup = function(req, res){
    return res.render('signup', {
        title: "Rescode | Register"
    });
};
