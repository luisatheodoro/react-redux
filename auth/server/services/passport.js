require('dotenv').config();
const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//Setup options for JWT strategy
//We need to specificaly tell the jwtOptions where passport will get access to the request payload.
const jwtOptions = {
    //in this case we are saying to look at the request header with the name authorization
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    //we also need to tell it the secrete to decode the token in the payload.
    secretOrKey: process.env.JWTSECRET
};

//Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    // see if the user id in the paylod exists in our database, if it does call done with that user
    //otherwise call done without a user object
    User.findById(payload.sub, function (err, user) {
        if (err) {
            return done(err, false);
        }

        if (user) {
            done(null, user);
        } else {
            done(err, false);
        }

    });
});

//Tell passport to use this strategy
passport.use(jwtLogin);
