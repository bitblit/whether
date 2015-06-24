var LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google').Strategy,
    User = require('./models/user'),
    bcrypt = require('bcrypt');

exports.local = new LocalStrategy(function (username, password, done) {
  var user = new User({ email : username });
  
  user.fetch({
    success: function (user) {
      if (bcrypt.compareSync(password, user.get('encPassword'))) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    },
    
    error: function (error, response) {
      console.log("Error! " + error);
      return done(null, false, { message: 'Incorrect username.' });
    }
  });
});

exports.facebook = new FacebookStrategy({
    clientID: 'clientId',
    clientSecret: 'clientSecret',
    callbackURL: "http://" + process.env.PARAM1 + "/auth/facebook/callback"
  }, 
  
  function (accessToken, refreshToken, profile, done) {
    var username = profile.emails[0].value;
    var providerData = { access: accessToken, refresh: refreshToken };

    User.prototype.findOrCreateFromProvider(username, 'facebook', providerData, function (err, user) {
      if (err) {
        console.log("Facebook - Err was " + JSON.stringify(err));
        done(err);
      } else if (user) {
        done(null, user);
      } else {
        console.log("shouldnt happen - no error but no user either");
        done(null, null);
      }
    });
  }
);

exports.google = new GoogleStrategy({
    returnURL: 'http://' + process.env.PARAM1 + '/auth/google/return',
    realm: 'http://' + process.env.PARAM1 + '/'
  },
  
  function (identifier, profile, done) {
    var username = profile.emails[0].value;
    User.prototype.findOrCreateFromProvider(username, 'google', {}, function (err, user) {
      if (err) {
        console.log("Google - Err was " + err);
        done(err);
      } else if (user) {
        done(null, user);
      } else {
        console.log("shouldnt happen - no error but no user either");
        done(null, null);
      }
    });
  }
);