angular.module('dms.services')
    .factory('Documents', ['$resource', '$http', function($resource, $http) {
        var obj = $resource('/api/documents/:id', {
            id: '@_id'
        }, {
            update: {
                // this method issues a PUT request
                method: 'PUT'
            }
        }, {
            stripTrailingSlashes: false
        });

        obj.updateDoc = function(doc, cb) {
            $http.put('/api/documents/' + doc._id).success(function(res) {
                cb(null, res);
            }).error(function(err) {
                cb(err);
            });
        };
        return obj;
    }]);
