angular.module('dms.controllers')
    .controller('DocumentsCtrl', ['$scope', 'Documents', '$mdDialog', 'Users', '$rootScope', function($scope, Documents, $mdDialog, Users, $rootScope) {
        $scope.allDocuments = Documents.query();
        $scope.userDocuments = function() {
            Users.userDocuments($rootScope.currentUser, function(err, res) {
                if (err) {
                    $scope.message = 'No documents have been created';
                } else {
                  console.log(res);
                }
            });
        };
        $scope.userDocuments();
        $scope.openOffscreen = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: '../views/form.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false
            });


        };

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }



    }]);
