describe('SignUp Controller Unit Tests', function() {
    var $rootScope, $scope, $state, Users, Auth, SignUpCtrl, $httpBackend;

    // Setup the module
    beforeEach(module('dms'));

    beforeEach(inject(function($injector, $controller) {
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.when('GET', '/api/users/session').respond(200, {
            id: 'id',
            token: 'token'
        });
        $httpBackend.when('GET', 'views/home.html').respond(200, {
            id: 'id',
            token: 'token'
        });
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope;
        $state = $injector.get('$state');
        Users = $injector.get('Users');
        Auth = $injector.get('Auth');
        SignUpCtrl = $controller('SignUpCtrl', {
            $scope: $scope,
            $rootScope: $rootScope
        });
    }));

    describe('SignUp Controller Unit Test', function() {
        it('Should define $scope.titles', function() {
            expect($scope.titles).toBeDefined();
            expect(typeof $scope.titles).toBe('object');
            expect($scope.titles instanceof Array).toBe(true);
            expect($scope.titles[0]).toBe('Public');
            expect($scope.titles[1]).toBe('Admin');
        });

        it('Should define $scope.signup', function() {
            expect($scope.signup).toBeDefined();
            expect(typeof $scope.signup).toBe('function');
        });

        it('Should test for password length', function() {
            $scope.user = {
                password: 'Ted'
            };
            $scope.signup();
            expect($scope.messageSignup).toBe('Your password needs to have a length greater than 8 characters');
        });

        it('Should test that password contains both numbers and non-word characters', function() {
            $scope.user = {
                password: 'HannahCK'
            };
            $scope.signup();
            expect($scope.messageSignup).toBe('Your password need to contain both numbers and non-word characters');
        });

        it('Should test that password contains both uppercase and lowercase characters', function() {
            $scope.user = {
                password: 'teddyotieno#1'
            };
            $scope.signup();
            expect($scope.messageSignup).toBe('Your password need to contain both uppercase and lower characters');
        });

        it('Should test that password matches confirmation password', function() {
            $scope.user = {
                password: 'TEddyotieno#1',
                confirmPassword: 'TEddyotieno#2'
            };
            $scope.signup();
            expect($scope.messageSignup).toBe('Your confirmation password does not match the initial password you have given');
        });

        it('Should test that Users.save and its success function are called when $scope.signup is called', function() {
            $scope.user = {
                firstname: 'Teddy',
                secondname: 'Otieno',
                username: 'tedotieno',
                email: 'teddy.asola@andela.com',
                title: 'Admin',
                password: 'TEddyotieno#1',
                confirmPassword: 'TEddyotieno#1'
            };
            Users.save = sinon.spy();
            $scope.signup();
            $httpBackend.flush();
            expect(Users.save.called).toBe(true);
            Auth.setToken = sinon.stub();
            $state.go = sinon.stub();
            Users.save.args[0][1]({
                id: 'id',
                token: 'token'
            });
            expect(Auth.setToken.called).toBe(true);
            expect($state.go.called).toBe(true);
            expect($rootScope.currentUser).toBeDefined();
            expect($rootScope.currentUser.token).toBe('token');
            expect($rootScope.currentUser.id).toBe('id');
        });

        it('Should test that Users.save and its failure function are called when $scope.signup is called', function() {
            $scope.user = {
                firstname: 'Teddy',
                secondname: 'Otieno',
                username: 'tedotieno',
                email: 'teddy.asola@andela.com',
                title: 'Admin',
                password: 'TEddyotieno#1',
                confirmPassword: 'TEddyotieno#1'
            };
            $httpBackend.whenPOST(/\/api\/users\/(.+)/, undefined, undefined, ['id']).respond(500, {
                id: 'id',
                token: 'token'
            });
            Users.save = sinon.spy();

            $scope.signup();
            $httpBackend.flush();
            expect(Users.save.called).toBe(true);
            Users.save.args[0][2]({
                data: {
                    error: [{
                        message: 'message'
                    }]
                }
            });
            expect($scope.messageSignup).toBeDefined();
            expect($scope.messageSignup).toBe('message');
        });

    });

});
