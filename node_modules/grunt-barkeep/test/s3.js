var grunt = require('grunt');
var s3 = require('../tasks/s3')(grunt);

// TODO: Write S3 tests?

module.exports = {
  testS3 : function (test) {
    test.expect(1);
    test.ok(true);
    test.done();
  }
};