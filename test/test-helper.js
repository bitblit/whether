var sinon = require('sinon');

module.exports = {
  fetchResponder: function (options) {
    options.success();
  },

  generateMockResponse: function () {
    return {
      render: sinon.spy()
    }
  },

  generateMockRequest: function () {
    return {
      params: {
        id: 'mock',
        email: 'mock',
        username: 'mock',
        password: 'mock'
      },
      body: {

      }
    }
  }
};

