angular.module('dms.controllers')
    .controller('DocumentsCtrl', ['$scope', 'Documents', '$mdDialog', 'Users', function($scope, Documents, $mdDialog) {
        $scope.documents = Documents.query();

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
