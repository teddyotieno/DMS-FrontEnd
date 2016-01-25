angular.module('dms.controllers')
    .controller('FormCtrl', ['$scope', 'Documents', '$mdDialog',
        '$mdToast', '$rootScope',
        function($scope, Documents, $mdDialog, $mdToast, $rootScope) {

            // If rootscope.doc object has not been provided
            // then this is not an update
            // set it to false to invoke the right action
            if (!$rootScope.doc) {
                $rootScope.isUpdating = false;
            }

            // Check if it is an updating request and
            // name the instructions right
            // for the action title and button title
            $scope.currentActionOnDoc =
                $rootScope.isUpdating ? 'Update Document' : 'Create Document';
            $scope.buttonAction = $rootScope.isUpdating ? 'Update' : 'Create';

            // If a document is provided use those details
            $scope.document = $rootScope.doc ? $rootScope.doc : {};

            $scope.createOrUpdateDoc = function() {
                // if the content is set
                if ($scope.document.hasOwnProperty('title') &&
                    $scope.document.hasOwnProperty('content')) {
                    // check whether we are updating or creating a new document
                    // then use that action to invoke the Document resource
                    // object with the right method
                    var actionToTake =
                        $rootScope.isUpdating ? 'update' : 'save';
                    Documents[actionToTake]($scope.document,
                        function(err, doc) {
                            if (err) {
                                console.log(err);
                            }
                            if (doc) {
                                $mdToast.show($mdToast.simple()
                                    .textContent('Document ' +
                                        $scope.buttonAction)
                                    .hideDelay(3000));
                                $mdDialog.hide();
                                $rootScope.$emit('documentCreated', {
                                    message: 'The document has been ' +
                                        $scope.buttonAction + 'd'
                                });
                            }
                        });
                }
            };

            // Cancel form dialog box
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
        }
    ]);
