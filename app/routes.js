var RootController = require('./controllers/root-controller'),
  UsersController = require('./controllers/users-controller'),
  CompareController = require('./controllers/compare-controller'),
    SessionsController = require('./controllers/sessions-controller');

module.exports = function (app, passport) {
  // Root
  app.get('/', RootController.index);

  // Users
  app.get('/users', UsersController.index);
  app.get('/register', UsersController.new);
  app.post('/users', UsersController.create);

  app.post('/compare', CompareController.compare);

  // Sessions
  app.get('/login', SessionsController.new);
  app.get('/logout', SessionsController.destroy);
  app.post('/login', passport.authenticate('local'), SessionsController.create);

  // Redirect the user to Facebook for authentication.  When complete,
  // Facebook will redirect the user back to the application at
  //     /auth/facebook/callback
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

  // Redirect the user to Google for authentication.  When complete, Google
  // will redirect the user back to the application at
  //     /auth/google/return
  app.get('/auth/google', passport.authenticate('google'));

  // Google will redirect the user to this URL after authentication.  Finish
  // the process by verifying the assertion.  If valid, the user will be
  // logged in.  Otherwise, authentication has failed.
  app.get('/auth/google/return',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  );

  // Redirect the user to Twitter for authentication.  When complete, Twitter
  // will redirect the user back to the application at
  //   /auth/twitter/callback
  app.get('/auth/twitter', passport.authenticate('twitter'));

  // Twitter will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  );

};
