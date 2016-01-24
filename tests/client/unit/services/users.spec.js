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
                // var error, response;
                // var cb = function(err, res) {
                //     if (err) {
                //         error = err;
                //         response = null;
                //     } else {
                //         error = null;
                //         response = res;
                //     }
                // };
                // httpBackend.when('POST', '/api/users/login').respond(500, {
                //     err: 'err'
                // });
                // Users.login({
                //     data: 'data'
                // }, cb);
                // httpBackend.flush();
                // expect(error.err).toBeDefined();
                // expect(error.err).toBe('err');
            });
        });
    });

});
