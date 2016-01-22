var request = require('superagent');
var base_url = 'http://localhost:3000';
var loginHelper = require('../helpers/login');
var docId1, docId2;

(function() {
    'use strict';
    describe('Test Suites for the Document', function() {
        it('Ensure User is authorized to view documents', function(done) {
            request
                .get(base_url + '/api/documents')
                .accept('application/json')
                .end(function(err, res) {
                    expect(res.status).toEqual(401);
                    expect(res.body.message).toEqual('Failed to provide token');
                    expect(res.body.success).toEqual(false);
                    done();
                });
        });

        it('Should return all Documents', function(done) {
            var getAllDocs = function(token) {
                request
                    .get(base_url + '/api/documents')
                    .set('x-access-token', token)
                    .accept('application/json')
                    .end(function(err, res) {
                        expect(res.status).toEqual(200);
                        expect(Array.isArray(res.body)).toBe(true);
                        //expect(res.body.documents.length).toBeGreaterThan(0);
                        done();
                    });
            };
            loginHelper.login(getAllDocs, 'Don', 'password');
        });

        it('Should create a document by an authorized User', function(done) {
            var createDocumentAdmin = function(token, ownerFN) {
                request
                    .post(base_url + '/api/documents', {
                        title: 'This is a new Docmument being created',
                        content: 'Attention on the Warriors and their likable cast of' +
                            'led by MVP sharpshooter Stephen Curry, ' +
                            'grew as the victories .' +
                            'On the road, fans and media filled arenas wondering ' +
                            'if this was the night they would witness the end of the run.',
                        owner: ownerFN
                    })
                    .set('x-access-token', token)
                    .end(function(err, res) {
                        docId1 = res.body.document._id;
                        expect(res.status).toEqual(200);
                        expect(res.body.message).toBeDefined();
                        expect(res.body.message).toBe('Document successfully created');
                        done();
                    });
            };
            loginHelper.login(createDocumentAdmin, 'Don', 'password');

            var createDocumentPublic = function(token) {
                request
                    .post(base_url + '/api/documents', {
                        title: 'This is a new Docmument being created by Public',
                        content: 'Today is going to be an super awesome day ' +
                            'probalby the best day of my entier life. ' +
                            'Feels exciting.'
                    })
                    .set('x-access-token', token)
                    .end(function(err, res) {
                        docId2 = res.body.document._id;
                        expect(res.status).toEqual(200);
                        expect(res.body.message).toBeDefined();
                        expect(res.body.message).toBe('Document successfully created');
                        done();
                    });
            };
            loginHelper.login(createDocumentPublic, 'Peggy', 'password');
        });

        it('Should return a specific document ' +
            'created by a user',
            function(done) {
                var findDocument = function(token) {
                    request
                        .get(base_url + '/api/documents/' + docId1)
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
                };
                loginHelper.login(findDocument, 'Don', 'password');
            });

        it('Should update a document', function(done) {
            var updateDocument = function(token) {
                request
                    .put(base_url + '/api/documents/' + docId1)
                    .set('x-access-token', token)
                    .send({
                        title: 'This is an old document being updated'
                    })
                    .accept('application/json')
                    .end(function(err, res) {
                        expect(res.status).toEqual(200);
                        expect(res.body.message).toBeDefined();
                        expect(res.body.message).toEqual('Document ' +
                            'successfully updated');
                        done();
                    });
            };
            loginHelper.login(updateDocument, 'Don', 'password');
        });

        it('Should validate that a document can be deleted', function(done) {
            var deleteDocument = function(token) {
                request
                    .delete(base_url + '/api/documents/' + docId1)
                    .set('x-access-token', token)
                    .end(function(err, res) {
                        expect(res.status).toEqual(200);
                        expect(res.body.message).toBe('Document ' +
                            'successfully deleted!!');
                        done();
                    });
            };
            loginHelper.login(deleteDocument, 'Don', 'password');

            var deleteDocumentAdmin = function(token) {
                request
                    .delete(base_url + '/api/documents/' + docId2)
                    .set('x-access-token', token)
                    .end(function(err, res) {
                        expect(res.status).toEqual(200);
                        expect(res.body.message).toBe('Document ' +
                            'successfully deleted!!');
                        done();
                    });
            };
            loginHelper.login(deleteDocumentAdmin, 'Don', 'password');
        });

        it('Should validate that User with Public Role is ' +
            'not authorized to delete all documents',
            function(done) {
                var deleteAllDocumentsPublic = function(token) {
                    request
                        .delete(base_url + '/api/documents')
                        .set('x-access-token', token)
                        .end(function(err, res) {
                            expect(res.status).toEqual(403);
                            expect(res.body.success).toBe(false);
                            expect(res.body.message).toBe('You need to have Admin ' +
                                'priviledges to delete all documents');
                            done();
                        });
                };
                loginHelper.login(deleteAllDocumentsPublic, 'Peggy', 'password');
            });

        it('Should validate that only the Admin ' +
            'could delete all the documents',
            function(done) {
                var deleteAllDocumentsAdmin = function(token) {
                    request
                        .delete(base_url + '/api/documents')
                        .set('x-access-token', token)
                        .end(function(err, res) {
                            expect(res.status).toEqual(200);
                            expect(res.body.success).toBeDefined();
                            expect(res.body.message).toBe('All Documents ' +
                                'successfully deleted');
                            done();
                        });
                };
                loginHelper.login(deleteAllDocumentsAdmin, 'Don', 'password');
            }
        );
    });
}());
