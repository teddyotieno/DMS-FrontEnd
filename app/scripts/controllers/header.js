angular.module('dms.controllers')
    .controller('HeaderCtrl', ['$scope', '$rootScope', '$state', '$window', 'Users', 'Auth', function($rootScope, $scope, $state, $window, Users, Auth) {
        $scope.user = {};
        $scope.login = function() {
            Users.login($scope.user, function(err, res) {
                if (!err) {
                    Auth.setToken(res.token);
                    var user = {};
                    user.name = res.firstname + ' ' + res.lastname;
                    $rootScope.currentUser = user;
                    $state.go('documents');
                } else {
                    $scope.messageLogin = err.error ||
                    err.message || err[0].message;
                    console.log($scope.messageLogin);
                }
            });
        };
        console.log($scope.users);


    }]);
