var Backbone = require('backbone-dynamodb'),
    User = require('../models/user');

var Users = Backbone.DynamoDB.Collection.extend({
  model: User
});