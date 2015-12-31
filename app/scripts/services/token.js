angular.module('dms.services')
  .factory('Token', ['$window', function($window) {
    return {
      set: function(token) {
        $window.localStorage.setItem('token', token);
      },

      get: function() {
        return $window.localStorage.getItem('token');
      },

      remove: function() {
        $window.localStorage.removeItem('token');
      }
    };
  }]);
