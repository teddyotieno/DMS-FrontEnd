describe('Document Controller Unit Tests', function() {
    var $httpBackend, $scope, Documents, $mdDialog, Users,
        $rootScope, $mdToast, DocumentsCtrl, $mdSidenav;
    beforeEach(module('dms'));
    beforeEach(inject(function($injector, $controller) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $rootScope.currentUser = {
            _id: '_id'
        };
        $httpBackend.when('GET', '/api/users/session').respond(200, {
            id: 'id',
            token: 'token'
        });
        $httpBackend.when('GET', 'views/home.html').respond(200, {
            id: 'id',
            token: 'token'
        });
        $httpBackend.when('GET', '/api/documents/').respond(200, {
            res: 'res'
        });
        $httpBackend.whenDELETE(/\/api\/documents\/(.+)/,
            undefined, undefined, ['id']).respond(200, {
            res: 'res'
        });
        $httpBackend.whenGET(/\/api\/users\/(.+)\/documents/,
            undefined, undefined, ['id']).respond(200, {
            id: 'id',
            token: 'token'
        });
        $httpBackend.whenPUT(/\/api\/users\/(.+)/, undefined, undefined, ['id'])
            .respond(200, {
                res: 'res'
            });

        $scope = $rootScope;
        Documents = $injector.get('Documents');
        Documents.query = sinon.stub().returns({
            res: 'res'
        });
        Documents.remove = sinon.stub().returns({
            res: 'res'
        });
        $mdDialog = $injector.get('$mdDialog');
        $mdSidenav = $injector.get('$mdSidenav');
        $mdToast = $injector.get('$mdToast');
        Users = $injector.get('Users');
        Users.userDocuments = sinon.stub().returns({
            res: 'res'
        });
        $rootScope.$on = sinon.spy();
        DocumentsCtrl = $controller('DocumentsCtrl', {
            $scope: $scope,
            $rootScope: $rootScope
        });
    }));

    describe('Document Controller Unit Tests', function() {

        it('Should define $scope.allDocuments', function() {
            expect($scope.allDocuments).toBeDefined();
            expect($scope.allDocuments.res).toBe('res');
            expect(Documents.query.called).toBe(true);
        });

        it('Should test that Users.userDocuments and its success function are called', function() {
            $scope.getUserDocs();
            $httpBackend.flush();
            expect(Users.userDocuments.called).toBe(true);
            Users.userDocuments.args[0][1](null, {
                res: 'res'
            });
            expect($scope.userDocs).toBeDefined();
            expect($scope.userDocs.res).toBe('res');
        });

        it('Should define openUserForm', function() {
            expect($scope.openUserForm).toBeDefined();
            expect(typeof $scope.openUserForm).toBe('function');
            $mdSidenav = sinon.stub().returns($mdSidenav);
            $mdSidenav('left');
            $mdSidenav.toggle = sinon.spy();
            $scope.openUserForm();
            expect($mdSidenav.called).toBe(true);
        });

        it('Should define closeUserForm', function() {
            expect($scope.closeUserForm).toBeDefined();
            expect(typeof $scope.closeUserForm).toBe('function');
            $mdSidenav = sinon.stub().returns($mdSidenav);
            $mdSidenav('left');
            $mdSidenav.toggle = sinon.spy()
            $scope.closeUserForm();
            expect($mdSidenav.called).toBe(true);
        });

        it('Should test that Users.userDocuments and its error function are called', function() {
            $scope.getUserDocs();
            $httpBackend.flush();
            expect(Users.userDocuments.called).toBe(true);
            console.log = sinon.stub();
            Users.userDocuments.args[0][1]({
                err: 'err'
            }, null);
            expect(console.log.called).toBe(true);
        });

        it('Should define updateUser function', function() {
            expect($scope.updateUser).toBeDefined();
            expect(typeof $scope.updateUser).toBe('function');
            Users.update = sinon.spy();
            $scope.updateUser();
            $httpBackend.flush();
            expect(Users.update.called).toBe(true);
            Users.update.args[0][1]({
                res: 'res',
            });
        });
        it('Should test that Documents.query function is called when loadAllDocs is called', function() {
            $scope.loadAllDocs();
            $httpBackend.flush();
            expect($scope.allDocuments).toBeDefined();
            expect($scope.allDocuments.res).toBe('res');
            expect(Documents.query.called).toBe(true);
        });

        it('Should test that $rootScope.$on calls getUserDocs after listening to Document Created event', function() {
            expect($rootScope.$on.called).toBe(true);
            $scope.getUserDocs = sinon.spy();
            $rootScope.$on.args[0][1]();
            expect($scope.getUserDocs.called).toBe(true);
        });

        it('Should test the deleteUserDoc function is defined', function() {
            var doc = {
                title: 'title',
                content: 'content'
            };
            expect($scope.deleteUserDoc).toBeDefined();
            expect(typeof $scope.deleteUserDoc).toBe('function');
            $mdDialog.show = sinon.stub().returns($mdDialog);
            $mdDialog.then = sinon.stub();
            console.log = sinon.spy();
            $scope.deleteUserDoc('ev', doc);
            expect($mdDialog.show.called).toBe(true);
            expect($mdDialog.then.called).toBe(true);
            Documents.remove = sinon.stub();
            $mdDialog.then.args[0][0]();
            expect(Documents.remove.called).toBe(true);
            $mdToast.show = sinon.stub().returns($mdToast);
            $scope.getUserDocs = sinon.spy();
            Documents.remove.args[0][1]();
            expect($mdToast.show.called).toBe(true);
            expect($scope.getUserDocs.called).toBe(true);
            $mdToast.show = sinon.stub().returns($mdToast);
            $mdDialog.then.args[0][1]();
            expect($mdToast.show.called).toBe(true);
        });

        it('Should test that $scope.openOffScreen is defined', function() {
            var doc = {
                title: 'title',
                content: 'content'
            };
            expect($scope.openOffscreen).toBeDefined();
            expect(typeof $scope.openOffscreen).toBe('function');
            $mdDialog.show = sinon.stub();
            $scope.openOffscreen('ev', doc);
            expect($rootScope.isUpdating).toBeDefined();
            expect($rootScope.doc).toBeDefined();
            expect($mdDialog.show.called).toBe(true);
        });
    });

});
