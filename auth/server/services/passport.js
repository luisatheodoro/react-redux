require('dotenv').config();
const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = {usernameField: 'email'}
//Create local strategy
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
    //verify this email and password, call done with the user
    //if it is the correct email and password
    //otherwise call done with false
    User.findOne({email: email}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        //compare passwords - is password equal to user.password?
        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                return done(err);
            }

            if (!isMatch) {
                return done(null, false);
            }
            return done(null, user);
        })
    });
});

//Setup options for JWT strategy
//We need to specifically tell the jwtOptions where passport will get access to the request payload.
const jwtOptions = {
    //in this case we are saying to look at the request header with the name authorization
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    //we also need to tell it the secret to decode the token in the payload.
    secretOrKey: process.env.JWTSECRET
};

//Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    // see if the user id in the payload exists in our database, if it does call done with that user
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

passport.use(jwtLogin);
passport.use(localLogin);
