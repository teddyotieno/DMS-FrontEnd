describe('Header Controller Unit Tests', function() {
    var $scope, $rootScope, $state, Users, Auth;

    // Setup the module
    beforeEach(module('dms'));
    beforeEach(inject(function($injector, $controller) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('POST', '/api/users/login').respond(200, [{
            res: 'res'
        }]);

        $httpBackend.when('GET', '/api/users/session').respond(200, {
            id: 'id',
            token: 'token'
        });
        $httpBackend.when('GET', 'views/home.html').respond(200, {
            id: 'id',
            token: 'token'
        });
        $httpBackend.when('GET', '/api/users/logout').respond(200, {
            id: 'id',
            token: 'token'
        });

        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope;
        $state = $injector.get('$state');
        Users = $injector.get('Users');
        Auth = $injector.get('Auth');
        Users.login = sinon.stub().returns({
            user: {
                name: {
                    first: 'Teddy',
                    second: 'Otieno'
                },
                username: 'tedotieno',
            }
        });
        Users.logout = sinon.stub().returns({
            res: 'res'
        });
        SignUpCtrl = $controller('HeaderCtrl', {
            $scope: $scope,
            $rootScope: $rootScope
        });
    }));

    describe('HeaderCtrl Controller Unit Test', function() {
        it('Should define $scope.user', function() {
            $scope.user = {
                username: 'Teddy',
                password: 'Password'
            };
            expect($scope.user).toBeDefined();
            expect($scope.user.username).toBeDefined();
            expect($scope.user.password).toBeDefined();
            expect(typeof $scope.user).toBe('object');
        });
        it('Should expect that $scope.login is defined and its success function is called when its called', function() {
            expect($scope.login).toBeDefined();
            expect(typeof $scope.login).toBe('function');
            Auth.setToken = sinon.stub();
            $state.go = sinon.stub();
            $scope.login();
            $httpBackend.flush();
            expect(Users.login.called).toBe(true);
            Users.login.args[0][1](null, {
                user: {
                    name: {
                        first: 'Teddy',
                        second: 'Otieno'
                    },
                    username: 'tedotieno',
                }
            });
            expect(Auth.setToken.called).toBe(true);
            expect($state.go.called).toBe(true);
        });
        it('Should expect that $scope.login and its failure function are called', function() {
            $scope.login();
            $httpBackend.flush();
            expect(Users.login.called).toBe(true);
            Users.login.args[0][1]({
                message: 'message'
            }, null);
            expect($scope.messageLogin).toBeDefined();
            expect($scope.messageLogin).toBe('Invalid Password!!');
            expect(typeof $scope.messageLogin).toBe('string');
        });
        it('Should expect that $scope.logout is defiend and its success function is called when its called', function() {
            expect($scope.logout).toBeDefined();
            expect(typeof $scope.logout).toBe('function');
            Auth.logout = sinon.stub();
            $state.go = sinon.stub();
            $scope.logout();
            $httpBackend.flush();
            expect(Users.logout.called).toBe(true);
            Users.logout.args[0][0](null, {
                res: 'res'
            });
            expect($state.go.called).toBe(true);
            expect(Auth.logout.called).toBe(true);
        });
        it('Should expect that', function() {

        });

    });
});
