angular.module('dms.controllers')
    .controller('FormCtrl', ['$scope', 'Documents',  '$mdDialog', 'Users', function($scope, Documents, $mdDialog) {
      $scope.document = {};
      $scope.createDoc = function() {
        var document = {
          title: $scope.document.title,
          content: $scope.document.content
        };
        Documents.save(document, function(res) {
          console.log(res);
        });
      };
    }]);