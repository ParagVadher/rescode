const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    
    clientID: "133376621973-6kaiikh1ms0sbgkf2jrpcb4gnk8l8c87.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){ console.log('Error in finding account on google', err); return; };
            console.log(profile);

            if(user){
                return done(user, null);
            }else{
                User.create(
                    {
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    }, function(err, user){
                        if(err){ console.log('Error in finding account on google', err); return; };

                        return done(null, user);

                    }
                )
            }
        });
    }
));

module.exports = passport;