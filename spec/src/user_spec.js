var faker = require('faker');
var frisby = require('frisby');
var request = require('superagent');
var base_url = 'http://localhost:3000';
var userId, token;


(function() {
  'use strict';
  describe('Test suites for the User Resource', function() {
    frisby.create('Get allUsers endpoint')
      .get('http://localhost:3000/api/users')
      .expectStatus(200)
      .toss();
    it('Should return all users in the DB or an empty array if there are no users', function(done) {
      request
        .get(base_url + '/api/users')
        .accept('application/json')
        .end(function(err, res) {
          expect(res.body.users instanceof Array).toBe(true);
          expect(res.body.users.length).toBeGreaterThan(0);
          done();
        });
    });

    it('Should ensures a new user is created on every POST request', function() {
      frisby.create('Ensuers a new  user is created')
        .post('http://localhost:3000/api/users', {
          firstname: faker.name.findName(),
          secondname: faker.name.findName(),
          username: faker.name.findName(),
          password: faker.name.findName(),
          email: faker.internet.email()
        })
        .expectStatus(200)
        .expectJSON({
          "message": "User successfully created"
        })
        .toss();
    });

    it('Should return that the user successfully logged in', function(done) {
      request
        .post(base_url + '/api/users/login')
        .send({
          username: 'Don',
          password: 'password'
        })
        .end(function(err, res) {
          userId = res.body.user._id;
          token = res.body.token;
          expect(res.status).toEqual(200);
          expect(res.body.message).toBe('User successfully logged in');
          expect(res.body.success).toBeDefined();
          expect(res.body.token).toBeDefined();
          done();
        });
    });

    it('Should return the specified user', function() {
      request
        .get(base_url + '/api/users/' + userId)
        .set('x-access-token', token)
        .accept('application/json')
        .end(function(err, res) {
          expect(res.status).toEqual(200);
          expect(res.body.password).toBeDefined();
          expect(res.body.email).toBeDefined();
          expect(res.body.username).toBeDefined();
          expect(res.body.name instanceof Object).toBe(true);
        });
    });

    it('Should return that a new docment has been created by the logged in user', function(done) {
      request
        .post(base_url + '/api/documents', {
          title: 'Don is the user who has created this document',
          content: 'While it downloaded and installed fine for me, I am having more problems with the release version than I was with the last beta. It hangs randomly for no reason.',
          ownerId: userId
        })
        .set('x-access-token', token)
        .end(function(err, res) {
          expect(res.status).toEqual(200);
          done();
        });
    });


    it('Should return the document(s) created by a specified User', function(done) {
      request
        .get(base_url + '/api/users/' + userId + '/documents')
        .set('x-access-token', token)
        .accept('application/json')
        .end(function(err, res) {
          expect(res.status).toEqual(200);
          expect(res.body.documents).toBeDefined();
          expect(res.body.documents.length).toBeGreaterThan(0);
          expect(res.body.documents instanceof Array).toBe(true);
          expect(res.body.documents[0].title).toEqual('Don is the user who has created this document');
          done();
        });
    });

    it('Should return that the user details has been successfully updated', function(done) {
      request
        .put(base_url + '/api/users/' + userId)
        .set('x-access-token', token)
        .send({
          email: faker.internet.email()
        })
        .end(function(err, res) {
          expect(res.status).toEqual(200);
          expect(res.body.message).toBe('User successfully updated');
          done();
        });
    });

    it('Should return that the user has been successfully logged out', function(done) {
      request
        .post(base_url + '/api/users/logout')
        .set('x-access-token', token)
        .end(function(err, res) {
          expect(res.status).toEqual(200);
          expect(res.body.message).toBe('User has been successfully logged out');
          done();
        });
    });


    it('Should return that the user has been successfully deleted', function(done) {
      request
        .delete(base_url + '/api/users/' + userId)
        .set('x-access-token', token)
        .end(function(err, res) {
          expect(res.status).toEqual(200);
          expect(res.body.message).toBe('User successfully deleted!');
          done();
        });
    });
  });

}());
