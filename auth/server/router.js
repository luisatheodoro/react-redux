const Authentication = require('./controllers/authentication');
const User = require('./controllers/user');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function (req, res) {
    res.send({hi: 'there'});
  });

  app.get('/users', requireAuth, User.users);

  app.get('/users/:id', requireAuth, User.user);

  app.post('/signin',
      requireSignin,
      Authentication.signin);

  app.post('/signup', Authentication.signup);
}
