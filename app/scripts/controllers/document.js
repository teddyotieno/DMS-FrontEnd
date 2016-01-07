angular.module('dms.controllers')
    .controller('DocumentsCtrl', ['$scope', 'Documents',  '$mdDialog', 'Users', '$rootScope', function($scope, Documents, $mdDialog, $rootScope) {
        $scope.documents = Documents.query();

        $scope.openOffscreen = function(ev) {
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: '../views/form.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
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
