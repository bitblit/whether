var Validator = function (attributes) {
  this.attributes = attributes;
  this.errors = [];
}

Validator.prototype = {

  matches: function (key, pattern, message) {
    var value = this.attributes[key];
    if (typeof value == "undefined") {
      return;
    }

    if (!value.match(pattern)) {
      this.error(key, message)
    }
  },

  present: function (key, message) {
    var present = true;
    var value = this.attributes[key];

    if (typeof value == "undefined") present = false;
    if (value === null) present = false;
    if (value === '') present = false;

    if (present === false) {
      this.error(key, message);
    }
  },

  error: function (key, message) {
    var error = {};
    error.field = key;
    error.message = message;
    this.errors.push(error);
  },

  isValid: function () {
    return this.errors.length == 0;
  }
};

module.exports = Validator;
