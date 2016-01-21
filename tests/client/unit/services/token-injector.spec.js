describe('Token Injector Service Test', function() {

    beforeEach(function() {
        module('dms');
    });

    var TokenInjector, Token;
    beforeEach(inject(function($injector) {
        TokenInjector = $injector.get('TokenInjector');
        Token = $injector.get('Token');
        Token.get = sinon.stub().returns(true);
    }));

    describe('Token Injector unit test', function() {
        it('request should be a function', function() {
            expect(TokenInjector.request).toBeDefined();
            expect(typeof TokenInjector.request).toBe('function');
            var config = {
                headers: {
                    'x-access-token': 'yes'
                }
            };
            expect(typeof TokenInjector.request(config)).toBe('object');
        });
    });
});
