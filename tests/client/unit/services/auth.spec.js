describe('Authentication Service Test', function() {
    beforeEach(function() {
        module('dms');
    });

    var Auth, Token;

    beforeEach(inject(function($injector) {
        Auth = $injector.get('Auth');
        Token = $injector.get('Token');
        Token.get = sinon.stub().returns(true);
    }));

    describe('Authentication Service Unit tests', function() {
        it('isLoggedIn should be a function', function() {
            expect(Auth.isLoggedIn).toBeDefined();
            expect(typeof Auth.isLoggedIn).toBe('function');
            expect(Auth.isLoggedIn()).toBe(true);
            Token.get = sinon.stub().returns(false);
            expect(Auth.isLoggedIn()).toBe(false);
        });

        it('setToken should be a function', function() {
            expect(Auth.setToken).toBeDefined();
            expect(typeof Auth.setToken).toBe('function');
            Token.set = sinon.spy();
            Auth.setToken('token');
            expect(Token.set.called).toBe(true);
        });

        it('logout should be a function and be defined', function() {
            expect(Auth.logout).toBeDefined();
            expect(typeof Auth.logout).toBe('function');
            Token.remove = sinon.spy();
            Auth.logout();
            expect(Token.remove.called).toBe(true);
        });
    });

});
