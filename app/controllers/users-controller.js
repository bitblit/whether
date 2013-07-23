var User = require('../models/user'),
    bcrypt = require('bcrypt'),
    _ = require('underscore');

var UsersController = { 
  index: function (req, res) {
    console.log("logged in user:" + JSON.stringify(req.user));
    var model = { title : 'Whether' };
    if (req.user) { model.user = req.user; }
    res.render('root/index', model);
  },
  
  show: function (req, res) {
    var user = new User({ id: req.params.id });
    user.fetch({
      success: function (user) {
        res.render('users/show', user);
      }
    });
  },
  
  new: function (req, res) {
    res.render('users/form');
  },
  
  create: function (req, res) {
    var salt = bcrypt.genSaltSync(10),
      hashedPassword = bcrypt.hashSync(req.body.user.password, salt),
      filteredFields = ['password', 'passwordConfirm'];
      
    req.body.user.encPassword = hashedPassword;
    
    var user = new User();
    user.save(_.omit(req.body.user, filteredFields), { 
      success: function (user) {
        req.login(user, function (err) {
          // if (err) { return next(err); }
          return res.redirect('/');
        });
      }
    });
  }
};

module.exports = UsersController;