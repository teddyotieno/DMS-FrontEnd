var request = require('superagent');
var faker = require('faker');
var base_url = 'http://localhost:3000';
var userId, token;

(function() {
  'use strict';
  describe('Test Suites for the Roles', function() {

    //Logs in a User before running the tests
    beforeEach(function(done) {
      if (token) {
        done();
      } else {
        request
          .post('http://localhost:3000/api/users/login')
          .send({
            username: 'Don',
            password: 'password'
          })
          .end(function(err, res) {
            expect(res.status).toEqual(200);
            expect(res.body.message).toBe('User successfully logged in');
            userId = res.body.user._id;
            token = res.body.token;
            done();
          });
      }
    });

    it('Should ensure the user is logged in for it' +
        ' to return all the roles', function(done) {
      request
        .get(base_url + '/api/roles')
        .accept('application/json')
        .end(function(err, res) {
          expect(res.status).toEqual(401);
          expect(res.body.message).toEqual('Failed to provide token');
          expect(res.body.success).toEqual(false);
          done();
        });
    });

    it('Should Return all Roles stored in the DB', function(done) {
      request
        .get(base_url + '/api/roles')
        .set('x-access-token', token)
        .accept('application/json')
        .end(function(err, res) {
          expect(res.status).toEqual(200);
          expect(res.body.roles instanceof Array).toBe(true);
          expect(res.body.roles.length).toBeGreaterThan(0);
          done();
        });
    });

    it('Should create a new unique role', function(done) {
      request
        .post(base_url + '/api/roles', {
          title: faker.internet.email()
        })
        .set('x-access-token', token)
        .accept('application/json')
        .end(function(err, res) {
          expect(res.status).toEqual(200);
          expect(res.body.message).toBe('Role successfully created');
          done();
        });
    });

    it('Should assert that a role cannot ' +
      'be duplicated and has to be unique', function(done) {
      request
        .post(base_url + '/api/roles', {
          title: 'Admin'
        })
        .set('x-access-token', token)
        .accept('application/json')
        .end(function(err, res) {
          expect(res.status).toEqual(500);
          expect(res.body.success).toBe(false);
          expect(res.body.message).toBe('A role of that name already exists');
          done();
        });
    });

    it('Should update the title role of the current user', function(done) {
      request
        .put(base_url + '/api/roles/' + userId)
        .send({
          title: 'Third-Party'
        })
        .set('x-access-token', token)
        .end(function(err, res) {
          expect(res.status).toEqual(200);
          expect(res.body.message).toBe('Role successfully updated');
          done();
        });
    });
  });
}());
