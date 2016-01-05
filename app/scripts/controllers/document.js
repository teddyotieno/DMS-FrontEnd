angular.module('dms.controllers')
  .controller('DocumentsCtrl', ['$scope', 'Documents', function($scope, Documents) {
    $scope.documents = Documents.query();
    console.log($scope.documents);

  }]);