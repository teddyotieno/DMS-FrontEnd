var request = require('superagent');
var base_url = 'http://localhost:3000';
var userId, docId, token;


(function() {
  "use strict";
  describe("Test Suites for the Roles", function() {

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

    it('Should ensure the user is logged in for it to return all the roles', function(done) {
      request
        .get(base_url + '/api/roles')
        .accept('application/json')
        .end(function(err, res) {
          expect(res.status).toEqual(403);
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
          title: 'Third-Party'
        })
        .set('x-access-token', token)
        .accept('application/json')
        .end(function(err, res) {
          expect(res.status).toEqual(200);
          expect(res.body.message).toBe('Role successfully created');
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

    // it('Should store a newly created document by the logged in user', function(done) {
    //   request
    //     .post(base_url + '/api/documents', {
    //       title: 'This is a new Docmument being created',
    //       content: 'Attention on the Warriors and their likable cast of characters,' +
    //         'led by MVP sharpshooter Stephen Curry, grew as the victories piled up.' +
    //         'On the road, fans and media filled arenas wondering ' +
    //         'if this was the night they would witness the end of the run.'
    //     })
    //     .set('x-access-token', token)
    //     .end(function(err, res) {
    //       docId = res.body.document._id;
    //       expect(res.status).toEqual(200);
    //       expect(res.body.message).toBeDefined();
    //       expect(res.body.message).toBe('Document successfully created');
    //       done();
    //     });
    // });

    // it('Should return a specific document created by a user', function(done) {
    //   request
    //     .get(base_url + '/api/documents/' + docId)
    //     .set('x-access-token', token)
    //     .accept('application/json')
    //     .end(function(err, res) {
    //       expect(res.status).toEqual(200);
    //       expect(res.body.title).toBeDefined();
    //       expect(res.body.content).toBeDefined();
    //       expect(res.body.title).toEqual('This is a new Docmument being created')
    //       done();
    //     });
    // });

    // it('Should update the fields of the current document being updated', function(done) {
    //   request
    //     .put(base_url + '/api/documents/' + docId)
    //     .set('x-access-token', token)
    //     .send({
    //       title: 'This is an old document being updated'
    //     })
    //     .accept('application/json')
    //     .end(function(err, res) {
    //       expect(res.status).toEqual(200);
    //       expect(res.body.message).toBeDefined();
    //       expect(res.body.message).toEqual('Document successfully updated');
    //       done();
    //     });
    // });

    // it('Should delete a specified document that was initially created by a user', function(done) {
    //   request
    //     .delete(base_url + '/api/documents/' + docId)
    //     .set('x-access-token', token)
    //     .end(function(err, res) {
    //       expect(res.status).toEqual(200);
    //       expect(res.body.message).toBe('Document successfully deleted!!');
    //       done();
    //     });
    // });
  });
}());
