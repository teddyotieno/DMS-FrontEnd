var request = require('superagent');
var base_url = 'http://localhost:3000';
var userId, docId, token;


(function() {
  'use strict';
  describe('Test Suites for the Document', function() {
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

    it('Ensure User is authorized to view documents', function(done) {
      request
        .get(base_url + '/api/documents')
        .accept('application/json')
        .end(function(err, res) {
          expect(res.status).toEqual(403);
          expect(res.body.message).toEqual('Failed to provide token');
          expect(res.body.success).toEqual(false);
          done();
        });
    });

    it('Should Return all Documents', function(done) {
      request
        .get(base_url + '/api/documents')
        .set('x-access-token', token)
        .accept('application/json')
        .end(function(err, res) {
          expect(res.status).toEqual(200);
          expect(res.body.documents instanceof Array).toBe(true);
          expect(res.body.documents.length).toBeGreaterThan(0);
          done();
        });
    });

    it('Should create a document by an authorized User', function(done) {
      request
        .post(base_url + '/api/documents', {
          title: 'This is a new Docmument being created',
          content: 'Attention on the Warriors and their likable cast of' +
            'led by MVP sharpshooter Stephen Curry, grew as the victories .' +
            'On the road, fans and media filled arenas wondering ' +
            'if this was the night they would witness the end of the run.'
        })
        .set('x-access-token', token)
        .end(function(err, res) {
          docId = res.body.document._id;
          expect(res.status).toEqual(200);
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toBe('Document successfully created');
          done();
        });
    });

    it('Should return a specific document created by a user', function(done) {
      request
        .get(base_url + '/api/documents/' + docId)
        .set('x-access-token', token)
        .accept('application/json')
        .end(function(err, res) {
          expect(res.status).toEqual(200);
          expect(res.body.title).toBeDefined();
          expect(res.body.content).toBeDefined();
          expect(res.body.title)
            .toEqual('This is a new Docmument being created');
          done();
        });
    });

    it('Should update a document', function(done) {
      request
        .put(base_url + '/api/documents/' + docId)
        .set('x-access-token', token)
        .send({
          title: 'This is an old document being updated'
        })
        .accept('application/json')
        .end(function(err, res) {
          expect(res.status).toEqual(200);
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual('Document successfully updated');
          done();
        });
    });

    it('Should validate that a document can be deleted', function(done) {
      request
        .delete(base_url + '/api/documents/' + docId)
        .set('x-access-token', token)
        .end(function(err, res) {
          expect(res.status).toEqual(200);
          expect(res.body.message).toBe('Document successfully deleted!!');
          done();
        });
    });
  });
}());
