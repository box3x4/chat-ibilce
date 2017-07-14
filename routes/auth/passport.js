const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../../models/userLocal');

passport.use('login', new localStrategy({
        usernameField : 'username',
        passwordField : 'senha',
        passReqToCallback : true
}, (req, username, senha, done) => {

    User.getUserByUsername(username, (err, user) => {

      if(err)
        return done(err);
      if(!user)
        return done(null, false);

      User.comparePassword(senha, user.senha, (err, match) => {

        if(err)
          return done(err);

        if(match)
          return done(null, user);

        else
          return done(null, false);
    });
  });
}));

const logout = (req, res) => {
        req.logout();
        return res.redirect('/');
};

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    return done(err, user);
  });
});

module.exports = passport;
module.exports.logout = logout;
