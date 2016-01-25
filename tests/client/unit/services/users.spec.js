describe('User Service Tests', function() {

    beforeEach(function() {
        module('dms');
    });
    var Users, httpBackend;

    beforeEach(inject(function($injector) {
        Users = $injector.get('Users');
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', '/api/users/session').respond(200, {
            id: 'id',
            token: 'token'
        });

        $httpBackend.when('GET', 'views/home.html').respond(200, {
            id: 'id',
            token: 'token'
        });
    }));

    describe('User Service Tests', function() {
        describe('User.login Tests', function() {
            it('Users.login should be a function', function() {
                expect(Users.login).toBeDefined();
                expect(typeof Users.login).toBe('function');
            });

            it('Test success of login function', function() {
                var err, response;
                var cb = function(err, res) {
                    if (err) {
                        error = err;
                        response = null;
                    } else {
                        error = null;
                        response = res;
                    }
                };
                $httpBackend.when('POST', '/api/users/login').respond(200, {
                    res: 'res'
                });
                Users.login({
                    user: 'user'
                }, cb);
                $httpBackend.flush();
                expect(response.res).toBeDefined();
                expect(response.res).toBe('res');
            });

            it('Test failure of login function', function() {
                var error, response;
                var cb = function(err, res) {
                    if (err) {
                        error = err;
                        response = null;
                    } else {
                        error = null;
                        response = res;
                    }
                };
                $httpBackend.when('POST', '/api/users/login').respond(500, {
                    err: 'err'
                });
                Users.login({
                    data: 'data'
                }, cb);
                $httpBackend.flush();
                expect(error.err).toBeDefined();
                expect(error.err).toBe('err');
            });
        });

        describe('Users.logout Tests', function() {
            it('Users.logout should be defiend and a function', function() {
                expect(Users.logout).toBeDefined();
                expect(typeof Users.logout).toBe('function');
            });

            it('Tests sucess of Users.logout function', function() {
                var error, response;
                var cb = function(err, res) {
                    if (err) {
                        error = err;
                        response = null;
                    } else {
                        error = null;
                        response = res;
                    }
                };
                $httpBackend.when('GET', '/api/users/logout').respond(200, {
                    res: 'res'
                });
                Users.logout(cb);
                $httpBackend.flush();
                expect(response.res).toBeDefined();
                expect(response.res).toBe('res');
            });

            it('Tests failure of Users.logout function', function() {
                var error, response;
                var cb = function(err, res) {
                    if (err) {
                        error = err;
                        response = null;
                    } else {
                        error = null;
                        response = res;
                    }
                };
                $httpBackend.when('GET', '/api/users/logout').respond(500, {
                    err: 'err'
                });
                Users.logout(cb);
                $httpBackend.flush();
                expect(error.err).toBeDefined();
                expect(error.err).toBe('err');
            });
        });

        describe('Users.session Tests', function() {
            it('Users.session should be defined and a function', function() {
                expect(Users.session).toBeDefined();
                expect(typeof Users.session).toBe('function');
            });
        });

        describe('Tests for Users Documents', function() {
            it('Users.userDocuments should be defined and a function', function() {
                expect(Users.logout).toBeDefined();
                expect(typeof Users.logout).toBe('function');
            });

            it('Should test for success of User Documents function', function() {
                var error, response;
                var cb = function(err, res) {
                    if (err) {
                        error = err;
                        response = null;
                    } else {
                        error = null;
                        response = res;
                    }
                };
                var user = {
                    id: '12345'
                };
                $httpBackend.whenGET(/\/api\/users\/(.+)\/documents/,
                    undefined, undefined, ['id']).respond(200, {
                    res: 'res'
                });
                Users.userDocuments(user, cb);
                $httpBackend.flush();
                expect(response.res).toBeDefined();
                expect(response.res).toBe('res')
            });

            it('Should test for failure of User Documents function', function() {
                var error, response;
                var cb = function(err, res) {
                    if (err) {
                        error = err;
                        response = null;
                    } else {
                        error = null;
                        response = res;
                    }
                };
                var user = {
                    id: '12345'
                };
                $httpBackend.whenGET(/\/api\/users\/(.+)\/documents/,
                    undefined, undefined, ['id']).respond(500, {
                    err: 'err'
                });
                Users.userDocuments(user, cb);
                $httpBackend.flush();
                expect(error.err).toBeDefined();
                expect(error.err).toBe('err');
            });
        });
    });

});
