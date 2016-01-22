angular.module('dms.services')
  .factory('Auth', ['Token', function(Token) {
    return {
      isLoggedIn: function() {
        if (Token.get()) {
          return true;
        } else {
          return false;
        }
      },
      setToken: function(token) {
        Token.set(token);
      },
      logout: function() {
        Token.remove();
      }
    };
  }]);
