angular.module('dms.controllers')
  .controller('WelcomeCtrl', ['$scope', function($scope){
    $scope.message = 'Welcome to the Home Page of our app';
  }]);