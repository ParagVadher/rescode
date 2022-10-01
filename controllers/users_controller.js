const User = require('../models/user');

// module.exports.profile = function(req, res){
//     return res.end('<h1>is this entertaining? ayi ayi ya</h1>');
// };

module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('user_profile', {
                    title: 'User Profile',
                    user: user
                })
            }
        });
    }else{
        return res.redirect('/users/signup')
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

    // create a user if it does not already exist
    // first find it
    User.findOne({email: req.body.email}, function(err, user){
        if(err){ console.log('error in finding the user with that email on sign up'); return}

        // if no such user, then 

        if(!user){
            User.create(req.body, function(err, user){
                if(err){ console.log('error in finding the user with that email on sign up'); return}

                return res.redirect('/users/login');

            })
            // else go back to the sign up page
        }else{
            return res.redirect('back');
        }
    });
}

// log in and create a session for the user
module.exports.createSession = function(req, res){
    // authenticate the user
    // find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){ console.log('error in finding the user with that email when logging in'); return}

        // handle if user is found
        if(user){
            // handle if password does not match
            if(user.password != req.body.password){
                return res.redirect('back');
            }else{
                // if it matches then assign a cookie to a user_id and redirect to the profile page
                res.cookie('user_id', user._id);
                return res.redirect('/users/profile');
            }
        }else{
            return res.redirect('back');
        }
    });
}

module.exports.endSession = function(req, res){
    // TODO delete the sesh
    res.cookie('user_id', "");
    return res.redirect('/users/signup');
}