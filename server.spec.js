var chai = require('chai');
var assert = chai.assert;
var request = require('request');
var url ='http://localhost:3000';

describe('Test on restaurant:', function () {
  describe('website', function () {
    it('GET: /', function (done) {
      request(url, function (err, res, body) {
        assert.equal(res.statusCode, 200);
        done();
      })
    })
  })
})
