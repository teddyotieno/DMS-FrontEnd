angular.module('dms.controllers')
    .controller('SignUpCtrl', ['$rootScope', '$scope',
        '$state', 'Users', 'Auth', '$mdToast',
        function($rootScope, $scope, $state, Users, Auth, $mdToast) {
            $scope.titles = ['Public', 'Admin'];

            // Define $scope.signup
            $scope.signup = function() {
                if ($scope.user.password.trim().length < 8) {
                    $scope.messageSignup =
                        'Password length needs to be ' +
                        'greater than 8 characters';
                } else if (!/\d/.test($scope.user.password.trim()) ||
                    !/\w/.test($scope.user.password.trim())) {
                    $scope.messageSignup =
                        'Password should contain both ' +
                        'numbers and non-word characters';
                } else if (!/[A-Z]/.test($scope.user.password.trim()) ||
                    !/[a-z]/.test($scope.user.password.trim())) {
                    $scope.messageSignup =
                        'Password should contain both ' +
                        'uppercase and lower characters';
                } else if ($scope.user.password.trim() ===
                    $scope.user.confirmPassword.trim()) {
                    var user = {
                        firstname: $scope.user.firstName,
                        secondname: $scope.user.secondName,
                        username: $scope.user.username,
                        email: $scope.user.email,
                        title: $scope.user.title,
                        password: $scope.user.password
                    };

                    // Call Users.save only when the
                    // password matches expectation
                    Users.save(user, function(res) {
                        $mdToast.show($mdToast.simple()
                            .textContent('Registration Complete!')
                            .hideDelay(1000));
                        $rootScope.$emit('Registration Complete', {
                            user_profile: user
                        });
                        $scope.messageSignup = '';
                    }, function(err) {
                        console.log(err);
                        $scope.messageSignup = err.data.error[0].message;
                    });
                } else {
                    $scope.messageSignup =
                        'Confirmation password does not match ' +
                        'initial password given';
                }
                console.log($scope.messageSignup);
            };
        }
    ]);
