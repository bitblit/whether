var SessionsController = {
  
  create: function (req, res) {
    console.log("at login!");
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/');
  },
  
  destroy: function (req, res) {
    req.logout();
    res.redirect('/');
  },
  
  new: function (req, res) {
    console.log("at show login!");
    res.render('sessions/new');
  }
};

module.exports = SessionsController;
