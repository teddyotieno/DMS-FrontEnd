angular.module('dms.controllers')
    .controller('SignUpCtrl', ['$rootScope', '$scope', '$state', '$window', 'Users', 'Auth',
        function($rootScope, $scope, $state, $window, Users, Auth) {
            $scope.titles = ['Public', 'Admin'];
            // signup
            $scope.signup = function() {
                if ($scope.user.password.trim().length < 8) {
                    $scope.messageSignup =
                        'Your password needs to have a length greater than 8 characters';
                } else if (!/\d/.test($scope.user.password.trim()) ||
                    !/\w/.test($scope.user.password.trim())) {
                    $scope.messageSignup =
                        'Your password need to contain both numbers and non-word characters';
                } else if (!/[A-Z]/.test($scope.user.password.trim()) ||
                    !/[a-z]/.test($scope.user.password.trim())) {
                    $scope.messageSignup =
                        'Your password need to contain both uppercase and lower characters';
                } else if ($scope.user.password.trim() === $scope.user.confirmPassword.trim()) {
                    var user = {
                        firstname: $scope.user.firstName,
                        secondname: $scope.user.secondName,
                        username: $scope.user.username,
                        email: $scope.user.email,
                        title: $scope.user.title,
                        password: $scope.user.password
                    };
                    Users.save(user, function(res) {
                        Auth.setToken(res.token);
                        $rootScope.currentUser = res;
                        console.log('$rootScope.currentUser: ', $rootScope.currentUser);
                        $state.go('documents', {
                            id: $rootScope.currentUser.id
                        });
                    }, function(err) {
                        console.log(err);
                        $scope.messageSignup = err.data.error[0].message;
                    });
                } else {
                    $scope.messageSignup =
                        'Your confirmation password does not match the initial password you have given.';
                }
                console.log($scope.messageSignup);
            };
        }
    ]);
