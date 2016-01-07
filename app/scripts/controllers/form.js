angular.module('dms.controllers')
    .controller('FormCtrl', ['$scope', 'Documents', '$mdDialog', '$mdToast',  function($scope, Documents, $mdDialog, $mdToast) {
        $scope.createDoc = function() {
            if ($scope.document.title && $scope.document.content) {
                Documents.save($scope.document, function(res) {});
                $mdToast.show($mdToast.simple().textContent('Document Created').hideDelay(3000));
                $mdDialog.hide();
            } else {
                $scope.message = 'Document need to be defind';
            }
        };
    }]);
