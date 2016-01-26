describe('Form Controller Unit Tests', function() {
    var $httpBackend, $scope, Documents, $mdDialog,
        $rootScope, $mdToast, FormCtrl;
    beforeEach(module('dms'));
    beforeEach(inject(function($injector, $controller) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        var actionToTake;
        $rootScope.currentUser = {
            _id: '_id'
        };

        $rootScope.doc = null;
        $httpBackend.when('GET', '/api/users/session').respond(200, {
            id: 'id',
            token: 'token'
        });

        $httpBackend.when('GET', 'views/home.html').respond(200, {
            id: 'id',
            token: 'token'
        });

        $httpBackend.whenPOST(/\/api\/documents\/(.+)/, undefined, undefined, ['id']).respond(500, {
            id: 'id',
            token: 'token'
        });
        $scope = $rootScope;
        Documents = $injector.get('Documents');
        $mdDialog = $injector.get('$mdDialog');
        $mdToast = $injector.get('$mdToast');
        FormCtrl = $controller('FormCtrl', {
            $scope: $scope,
            $rootScope: $rootScope
        });
    }));
    describe('Form Controller Unit Tests', function() {
        it('Should check if $rootScope.doc is null', function() {
            expect($rootScope.doc).toBe(null);
            expect($rootScope.isUpdating).toBe(false);
            expect($rootScope.currentActionOnDoc).toBeDefined();
            expect($rootScope.buttonAction).toBeDefined();
            expect($scope.document).toBeDefined();
        });

        it('Should define $scope.createOrUpdateDoc and call Document[actionToTake] to save a new document', function() {
            $scope.document = {
                title: 'title',
                content: 'content'
            };
            expect($scope.createOrUpdateDoc).toBeDefined();
            expect(typeof $scope.createOrUpdateDoc).toBe('function');
            actionToTake = $rootScope.isUpdating ? 'update' : 'save';
            expect(actionToTake).toBeDefined();
            expect(actionToTake).toEqual('save');
            Documents[actionToTake] = sinon.stub().returns({
                res: 'res'
            });
            $scope.createOrUpdateDoc();
            $httpBackend.flush();
            expect(Documents[actionToTake].called).toBe(true);
            Documents[actionToTake].args[0][1](null, {
                res: 'res'
            });
        });

        it('Should test that Documenet[actionToTake] and its failure action are called', function() {
            $scope.document = {
                title: 'title',
                content: 'content'
            };
            expect($scope.createOrUpdateDoc).toBeDefined();
            expect(typeof $scope.createOrUpdateDoc).toBe('function');
            actionToTake = $rootScope.isUpdating ? 'update' : 'save';
            expect(actionToTake).toBeDefined();
            expect(actionToTake).toEqual('save');
            Documents[actionToTake] = sinon.stub().returns({
                res: 'res'
            });
            $scope.createOrUpdateDoc();
            $httpBackend.flush();
            expect(Documents[actionToTake].called).toBe(true);
            console.log = sinon.stub();
            Documents[actionToTake].args[0][1]({
                err: 'error'
            }, null);
            expect(console.log.called).toBe(true);
        });

        it('Should test that $scope.cancel is defined ', function() {
            expect($scope.cancel).toBeDefined();
            expect(typeof $scope.cancel).toBe('function');
            $mdDialog.cancel = sinon.spy();
            $scope.cancel();
            expect($mdDialog.cancel.called).toBe(true);

        });
    });
});
