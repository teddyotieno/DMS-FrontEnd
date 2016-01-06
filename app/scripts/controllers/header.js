angular.module('dms.controllers')
    .controller('HeaderCtrl', ['$scope', '$rootScope', '$state',
        '$window', 'Users', 'Auth',
        function($rootScope, $scope, $state, $window, Users, Auth) {
            $scope.user = {};
            $scope.login = function() {
                Users.login($scope.user, function(err, res) {
                    if (!err) {
                        Auth.setToken(res.token);
                        var user = {};
                        user.firstName = res.user.name.first;
                        user.username = res.user.username;
                        $rootScope.currentUser = user;
                        $state.go('documents');
                    } else {
                        $scope.messageLogin = err.error ||
                            err.message || err[0].message;
                        console.log($scope.messageLogin);
                    }
                });
            };

            $scope.logout = function() {
              Users.logout(function(err, res) {
                if(!err) {
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
