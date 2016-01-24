var faker = require('faker');
var request = require('superagent');
var base_url = 'http://localhost:3000';
var userId, token;

(function() {
    'use strict';
    describe('Test suites for the User Resource', function() {
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
        it('Should return all users in the DB or an empty ' +
            'array if there are no users',
            function(done) {
                request
                    .get(base_url + '/api/users')
                    .set('x-access-token', token)
                    .accept('application/json')
                    .end(function(err, res) {
                        expect(res.status).toEqual(200);
                        expect(res.body.length).toBeGreaterThan(0);
                        done();
                    });
            });

        it('Should ensure a new user is created ' +
            'on every POST request',
            function(done) {
                request
                    .post('http://localhost:3000/api/users', {
                        firstname: faker.name.findName(),
                        secondname: faker.name.findName(),
                        username: faker.name.findName(),
                        password: faker.name.findName(),
                        email: faker.internet.email(),
                        title: 'Public'
                    })
                    .accept('application/json')
                    .end(function(err, res) {
                        expect(res.status).toEqual(200);
                        expect(res.body.message).toBe('User successfully created');
                        done();
                    });
            });



        it('Should assert that a user has to be unique', function(done) {
            request
                .post(base_url + '/api/users', {
                    firstname: 'Donald',
                    secondname: 'Okwenda',
                    username: 'Don',
                    password: 'password',
                    email: 'don@gmail.com',
                    title: 'Admin'
                })
                .accept('application/json')
                .end(function(err, res) {
                    expect(res.body.code).toEqual(11000);
                    expect(res.status).toBe(500);
                    expect(res.body.errmsg.search('E11000 duplicate key error index: doc-plus.users.$username_1 dup key: { : "Don" }')).not.toBe(-1);
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

        it('Should return that a new docment has been ' +
            'created by the logged in user',
            function(done) {
                request
                    .post(base_url + '/api/documents', {
                        title: 'Don is the user who has created this document',
                        content: 'While it downloaded and installed fine for me, I ' +
                            'am having more problems with the release version than ' +
                            'I was with the last beta. It hangs randomly for no reason.',
                        ownerId: userId
                    })
                    .set('x-access-token', token)
                    .end(function(err, res) {
                        expect(res.status).toEqual(200);
                        done();
                    });
            });

        // it('Should return the document(s) ' +
        //     'created by a specified User',
        //     function(done) {
        //         request
        //             .get(base_url + '/api/users/' + userId + '/documents')
        //             .set('x-access-token', token)
        //             .accept('application/json')
        //             .end(function(err, res) {
        //                 expect(res.status).toEqual(200);
        //                 // expect(res.body).toBeDefined();
        //                 // expect(res.body.length).toBeGreaterThan(0);
        //                 // expect(res.body instanceof Array).toBe(true);
        //                 // expect(res.body[0].title).toEqual('Don is the user who ' +
        //                 //     'has created this document');
        //                 done();
        //             });
        //     });

        // it('Should return that the user details have ' +
        //     'been successfully updated',
        //     function(done) {
        //         request
        //             .put(base_url + '/api/users/' + userId)
        //             .set('x-access-token', token)
        //             .send({
        //                 email: faker.internet.email()
        //             })
        //             .end(function(err, res) {
        //                 expect(res.status).toEqual(200);
        //                 expect(res.body.message).toBe('User successfully updated');
        //                 done();
        //             });
        //     });

        it('Should return that the user has ' +
            'successfully logged out',
            function(done) {
                request
                    .get(base_url + '/api/users/logout')
                    .set('x-access-token', token)
                    .end(function(err, res) {
                        expect(res.status).toEqual(200);
                        expect(res.body.message).toBe('User has been successfully ' +
                            'logged out');
                        done();
                    });
            });

        it('Should return that the user has been ' +
            'successfully deleted',
            function(done) {
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
