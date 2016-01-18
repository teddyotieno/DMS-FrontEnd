angular.module('dms.controllers')
    .controller('DocumentsCtrl', ['$scope', 'Documents', '$mdDialog', 'Users', '$rootScope', function($scope, Documents, $mdDialog, Users, $rootScope) {
        $scope.allDocuments = Documents.query();
        console.log($rootScope.currentUser);

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
          console.log(doc);
            var confirm = $mdDialog.confirm()
                .title('Confirm if you want to delete the document?!')
                .textContent('Once you delete the document, there is no going back!')
                .ariaLabel('Delete Document')
                .targetEvent(ev)
                .ok('Delete')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function() {
              console.log(doc);
              console.log($rootScope.currentUser);
              Documents.deleteDoc(doc, function(err, res) {
                if(err) {
                  console.log(err);
                } else {
                  $scope.getUserDocs();
                }
              });
            }, function() {

            });
        };

        $scope.openOffscreen = function(ev) {
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
