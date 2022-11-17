const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest : extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'rescode'
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    User.findOne({id: jwtPayLoad.sub}, function(err, user){
        if(err){
            console.log('Err in find user from JWT', err);
            return;
        }
        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    });
}));

module.exports = passport;