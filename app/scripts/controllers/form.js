angular.module('dms.controllers')
    .controller('FormCtrl', ['$scope', 'Documents', '$mdDialog', '$mdToast', '$rootScope', 'Users', function($scope, Documents, $mdDialog, $mdToast, $rootScope, Users) {
        $scope.createDoc = function() {
            if ($scope.document.title && $scope.document.content) {
                Documents.save($scope.document, function(res) {});
                $mdToast.show($mdToast.simple().textContent('Document Created').hideDelay(3000));
                $mdDialog.hide();
                $scope.userDocuments();
            } else {
                $scope.message = 'Document need to be defined';
            }
        };
    }]);
