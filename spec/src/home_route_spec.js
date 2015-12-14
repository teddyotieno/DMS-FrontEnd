var frisby = require('frisby');

(function() {
  "use strict";
  describe('Document Management System API Home Route', function() {
    frisby.create('Return Status Code of 200')
      .get('http://localhost:3000')
      .expectStatus(200)
      .toss()
  });
}());
