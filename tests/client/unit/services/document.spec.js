describe('Document Service Tests', function() {
    beforeEach(function() {
        module('dms');
    });
    var Documents, httpBackend;

    beforeEach(inject(function($injector) {
        Documents = $injector.get('Documents');
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

    describe('Document Service Unit Tests', function() {
        describe('Test for updateDoc function', function() {
            it('Should test that updateDoc should be defined and a function', function() {
                expect(Documents.updateDoc).toBeDefined();
                expect(typeof Documents.updateDoc).toBe('function');
            });
        });

        it('Should test for success of updateDoc function', function() {
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
            var doc = {
                title: 'title',
                content: 'content'
            }
            $httpBackend.whenPUT(/\/api\/documents\/(.+)/,
                undefined, undefined, ['id']).respond(200, {
                res: 'res'
            });
            Documents.updateDoc(doc, cb);
            $httpBackend.flush();
            expect(response.res).toBeDefined();
            expect(response.res).toBe('res')
        });

        it('Should test for failure of updateDoc function', function() {
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
            var doc = {
                title: 'title',
                content: 'content'
            }
            $httpBackend.whenPUT(/\/api\/documents\/(.+)/,
                undefined, undefined, ['id']).respond(500, {
                err: 'err'
            });
            Documents.updateDoc(doc, cb);
            $httpBackend.flush();
            expect(error.err).toBeDefined();
            expect(error.err).toBe('err')
        });
    });
});
