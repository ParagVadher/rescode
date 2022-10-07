// login page controller
module.exports.login = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('login', {
        title: "Rescode | Login"
    });
};

// register page controller
module.exports.signup = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('signup', {
        title: "Rescode | Register"
    });
};
