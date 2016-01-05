angular.module('dms.services')
    .factory('Documents', ['$resource', '$http', function($resource) {
        var obj = $resource('/api/documents/:id', {
            id: '@id'
        }, {
            update: {
                // this method issues a PUT request
                method: 'PUT'
            }
        }, {
            stripTrailingSlashes: false
        });
        return obj;
    }]);
