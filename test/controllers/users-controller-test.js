var assert = require("assert"),
  sinon = require("sinon"),
  helper = require('../test-helper'),
  backbone = require('backbone-dynamodb').DynamoDB.Model.prototype,
  UsersController = require('../../app/controllers/users-controller');

describe("UsersController", function () {
  var saveStub, fetchStub, mockRequest, mockResponse;

  beforeEach(function () {
    saveStub = sinon.stub(backbone, "save", helper.saveResponder);
    fetchStub = sinon.stub(backbone, "fetch", helper.fetchResponder);
    mockRequest = helper.generateMockRequest();
    mockResponse = helper.generateMockResponse();
  });

  afterEach(function () {
    saveStub.restore();
    fetchStub.restore();
  });

  describe("#show", function () {
    it("should render the users/show template", function (done) {
      UsersController.show( mockRequest, mockResponse );
      assert( mockResponse.render.calledWith('users/show'), 'render not called with users/show' );
      done();
    });
  });

  describe("#new", function () {
    it("should render the users/form template", function (done) {
      UsersController.new( mockRequest, mockResponse );
      assert( mockResponse.render.calledWith('users/form'), 'render not called with users/form' );
      done();
    });
  });

});