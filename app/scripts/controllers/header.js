angular.module('dms.controllers')
    .controller('HeaderCtrl', ['$scope', '$rootScope', '$state',
        '$window', 'Users', 'Auth',
        function($scope, $rootScope, $state, $window, Users, Auth) {
            $scope.user = {};
            $scope.login = function() {
                Users.login($scope.user, function(err, res) {
                    if (!err) {
                        Auth.setToken(res.token);
                        var user = {};
                        user.firstName = res.user.name.first;
                        user.username = res.user.username;
                        $rootScope.currentUser = res.user;
                        $state.go('documents');
                    } else {
                      console.log(err);
                        if (err.message === 'Authentication failed. User not found') {
                            $scope.messageLogin = 'Invalid Username!!';
                            console.log($scope.messageLogin);
                        } else if (err.message || err[0].message || err.error === 'Authentication failed. Wrong password') {
                            $scope.messageLogin = 'Invalid Password!!';
                            console.log($scope.messageLogin);
                        }
                    }
                });
            };

            $scope.logout = function() {
                Users.logout(function(err, res) {
                    if (!err) {
                        delete $rootScope.currentUser;
                        Auth.logout();
                        $state.go('home');
                    } else {
                        console.log(err, res);
                    }
                });
            };
        }
    ]);
