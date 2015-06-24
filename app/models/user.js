var Backbone = require('backbone-dynamodb'),
    Users = require('../collections/users'),
    _ = require('underscore');

var User = Backbone.DynamoDB.Model.extend({
  tableName: "redress-user",
  idAttribute : "email",
  collection: Users,

  // Class methods
  findOrCreateFromProvider: function (username, provider, providerData, callback) {
    // TODO : need to verify the username is a valid email here probably
    var saveData = {"email": username};
    _.each(providerData, function (value, key) {
      // Null values would cause the save to fail
      if (value !== null) {
        saveData[provider + "-" + key] = value;
      }
    });

    var user = new User(saveData);

    var saveCallbacks = {
      success: function (user, response) {
        callback(null, user);
      },
      error: function (user, response) {
        console.log("in err : " + JSON.stringify(user) + " rep:" + JSON.stringify(response));
        callback(response, null);
      }
    };

    user.fetch({
      success: function (fetchedUser) {
        fetchedUser.save(saveData, saveCallbacks);
      },
      error : function (err, response) {

        user.save(_.extend(saveData, { email: username }), saveCallbacks);
      }
    });
  }

});

module.exports = User;
