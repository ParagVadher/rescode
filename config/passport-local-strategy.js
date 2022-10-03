const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

// import user
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user){
            if(err){ console.log('error in finding the user --> Passport'); return done(err);}
            if(!user || user.password!=password){
                console.log('Invalid User/Password');
                return done(null, false);
            }

            return done(null, user);
        });

    }
));

// serializing the user to decide which key is kept in the cokkies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){ console.log('error in finding the user --> Passport'); return done(err);}
        return done(null, user);
    })
});

// check if user is authenticated
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in
    return res.redirect('/users/login');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current data for the signed in user from the session cookie and we are just sending
        // it to the locals for the views 
        console.log(res.locals.user);
        console.log(req.user);
        res.locals.user = req.user;
    }
    next();
}

module.exports=passport;