angular.module('dms.controllers')
    .controller('HeaderCtrl', ['$scope', '$rootScope',
        '$state', 'Users', 'Auth', '$mdSidenav',
        function($scope, $rootScope, $state, Users, Auth, $mdSidenav) {
            $scope.user = {};
            $scope.openLoginForm = function() {
                $mdSidenav('right').toggle();
            };
            $scope.closeLoginForm = function() {
                $mdSidenav('right').close();
            };
            $rootScope.$on('Registration Complete', function() {
                $scope.openLoginForm();
            });
            $scope.login = function() {
                Users.login($scope.user, function(err, res) {
                    if (!err) {
                        Auth.setToken(res.token);
                        var user = {};
                        user.firstName = res.user.name.first;
                        user.username = res.user.username;
                        $rootScope.currentUser = res.user;
                        $scope.messageLogin = '';
                        $scope.closeLoginForm();
                        $state.go('documents');
                    } else {
                        console.log(err);
                        if (err.message === 'Authentication failed. ' +
                            'User not found') {
                            $scope.messageLogin = 'Invalid Username!!';
                        } else if (err.message || err[0].message ||
                            err.error === 'Authentication failed. ' +
                            'Wrong password') {
                            $scope.messageLogin = 'Invalid Password!!';
                        }
                    }
                });
            };

            $scope.logout = function() {
                Users.logout(function(err, res) {
                    if (!err && res) {
                        delete $rootScope.currentUser;
                        Auth.logout();
                        $state.go('home');
                    }
                });
            };
        }
    ]);
