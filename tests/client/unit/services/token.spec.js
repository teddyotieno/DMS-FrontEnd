describe('Token Service Test', function() {

    beforeEach(function() {
        module('dms');
    });

    var Token, windowRes;
    beforeEach(inject(function($injector) {
        windowRes = $injector.get('$window');
        Token = $injector.get('Token');
    }));

    describe('Token unit tests', function() {
        it('set should be a function', function() {
            expect(Token.set).toBeDefined();
            expect(typeof Token.set).toBe('function');
        });

        it('get should be a function', function() {
            expect(Token.get).toBeDefined();
            expect(typeof Token.get).toBe('function');
            Token.set('token');
            expect(Token.get()).toBe('token');
        });

        it('remove should be a function and be defined', function() {
            expect(Token.remove).toBeDefined();
            expect(typeof Token.remove).toBe('function');
        });
    });
});
