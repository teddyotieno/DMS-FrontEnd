angular.module('dms.services')
  .factory('TokenInjector', ['Token', function(Token) {
    var tokenInjector = {
      request: function(config) {
        var token = Token.get();
        if (token) {
          config.headers['x-access-token'] = token;
        }
        return config;
      }
    };
    return tokenInjector;
  }]);
