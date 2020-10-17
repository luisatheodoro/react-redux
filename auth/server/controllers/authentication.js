require('dotenv').config();
const User = require('../models/user');
const jwt = require('jwt-simple');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp }, process.env.JWTSECRET);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  // See if a user with a given email exists
  if(!email || !password) {
    return res.status(422).send({error: 'You must provide email and password'});
  }

  User.findOne({email: email}, function(err, existingUser){
    if(err) {return next(err);}

    if(existingUser) {
      return res.status(422).send({error: 'Email is in use'});
    }

    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if(err) {return next(err);}
      res.json({token: tokenForUser(user)});
    });
  });
}