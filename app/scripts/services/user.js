angular.module('dms.services')
    .factory('Users', ['$resource', '$http', function($resource, $http) {
        var obj = $resource('/api/users/:id', {
            id: '@_id'
        }, {
            update: {
                // this method issues a PUT request
                method: 'PUT'
            }
        }, {
            stripTrailingSlashes: false
        });

        obj.login = function(user, cb) {
            $http.post('/api/users/login', user).success(function(res) {
                cb(null, res);
            }).error(function(err) {
                cb(err);
            });
        };

        obj.logout = function(cb) {
            $http.get('/api/users/logout').success(function(res) {
                cb(null, res);
            }).error(function(err) {
                cb(err);
            });
        };

        obj.session = function(cb) {
            $http.get('/api/users/session').success(function(res) {
                cb(null, res);
            }).error(function(err) {
                cb(err);
            });
        };

        obj.userDocuments = function(user, cb) {
            $http.get('/api/users/' + user._id + '/documents')
                .success(function(res) {
                    cb(null, res);
                }).error(function(err) {
                    cb(err);
                });
        };

        return obj;
    }]);
