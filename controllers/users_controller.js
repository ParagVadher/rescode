const User = require('../models/user');

// module.exports.profile = function(req, res){
//     return res.end('<h1>is this entertaining? ayi ayi ya</h1>');
// };

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });

}

module.exports.update = function(req, res){
    // check if the logged in user and the user making the update request are the same
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            req.flash('success', 'Profile updated');
            return res.redirect('back');
        });
    }else{
        req.flash('error', '401 | Unautorized')
        return res.status(401).send('Unauthorized');
    }
}

module.exports.login = function(req, res){
    return res.end('<h1>This is supposed to be a login page</h1>');
};

// get the sign up data
module.exports.create = function(req, res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){ console.log('error in finding the user with that email on sign up'); return}
        
        if(!user){
            User.create(req.body, function(err, user){
                if(err){ console.log('error in finding the user with that email on sign up'); return}

                return res.redirect('/users/login');

            })
        }else{
            return res.redirect('back');
        }
    });
}

// log in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res, next){
    req.logout(function(error) {
        req.flash('success', 'You have logged out');
        res.redirect('/');
    });
  };