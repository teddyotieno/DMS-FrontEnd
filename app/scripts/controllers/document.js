angular.module('dms.controllers')
    .controller('DocumentsCtrl', ['$scope', 'Documents', '$mdDialog', 'Users', '$rootScope', '$mdToast', function($scope, Documents, $mdDialog, Users, $rootScope, $mdToast) {
        $scope.allDocuments = Documents.query();

        $scope.getUserDocs = function() {
            Users.userDocuments($rootScope.currentUser, function(err, res) {
                if (err) {
                    console.log(err);
                } else {
                    $scope.userDocs = res;
                }
            });
        };

        $scope.getUserDocs();

        $scope.loadAllDocs = function() {
            $scope.allDocuments = Documents.query();
        };

        $rootScope.$on('documentCreated', function(event, data) {
            $scope.getUserDocs();
            console.log('Successfully listened', data);
        });

        $scope.deleteUserDoc = function(ev, doc) {
            var confirm = $mdDialog.confirm()
                .title('Confirm if you want to delete the document?!')
                .textContent('Once you delete the document, there is no going back!')
                .ariaLabel('Delete Document')
                .targetEvent(ev)
                .ok('Delete')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function() {
                Documents.deleteDoc(doc, function(err, res) {
                    if (err) {
                        console.error(err);
                    } else {
                        $scope.getUserDocs();
                        $mdToast.show($mdToast.simple().textContent('Document Deleted').hideDelay(2000));
                    }
                });
            }, function() {});
        };

        // $scope.updateUserDoc = function(ev, doc) {

        // };
        $scope.openOffscreen = function(ev, doc) {
            $rootScope.isUpdating = true;
            $rootScope.doc = doc;
            $mdDialog.show({
                controller: DialogController,
                templateUrl: '../views/form.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false
            });
        };

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }

    }]);
