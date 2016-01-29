angular.module('dms.controllers')
    .controller('DocumentsCtrl', ['$scope', 'Documents', '$mdDialog',
        'Users', '$rootScope', '$mdToast', '$mdSidenav',
        function($scope, Documents, $mdDialog, Users,
            $rootScope, $mdToast, $mdSidenav) {
            $scope.user = $rootScope.currentUser;

            // Initializes the user password to an empty string
            $scope.userPassword = '';

            // Fetch all documents from the server when the app initializes
            $scope.allDocuments = Documents.query();

            // Fetch all users from the server when the app
            // initializes to display to user
            $scope.users = Users.query();

            // Fetch all documents by the logged in User
            $scope.getUserDocs = function() {
                if ($scope.user) {
                    Users.userDocuments($scope.user, function(err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            $scope.userDocs = res;
                        }
                    });
                }
            };
            $scope.getUserDocs();

            // Function to fetch all dcocuments
            $scope.loadAllDocs = function() {
                $scope.allDocuments = Documents.query();
            };

            $scope.loadAllUsers = function() {
                $scope.users = Users.query();
            };

            // Listen to the User Details event and run $scope.openUserForm()
            $rootScope.$on('User Details', function() {
                $mdSidenav('left').toggle();
            });

            // Listen to the documentCreated event and run $scope.getUserDocs()
            $rootScope.$on('documentCreated', function() {
                $scope.getUserDocs();
            });

            $scope.listUsers = function() {
                $mdSidenav('listUsers').toggle();
            };

            $scope.closeListUsers = function() {
                $mdSidenav('listUsers').close();
            };

            $scope.deleteUser = function(ev, user) {
                var confirm = $mdDialog.confirm()
                    .title('Confirm if you want to delete the user')
                    .textContent('Once you delete the user, ' +
                        'there is no going back!')
                    .ariaLabel('Delete User')
                    .targetEvent(ev)
                    .ok('Delete')
                    .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    console.log(user);
                    Users.remove({
                        id: user._id
                    }, function() {
                        $scope.loadAllUsers();
                        $mdToast.show($mdToast.simple()
                            .textContent('User Deleted').hideDelay(2000));
                        $scope.closeListUsers();
                    });
                }, function() {
                    $mdToast.show($mdToast.simple()
                        .textContent('User Retained').hideDelay(2000));
                    $scope.closeListUsers();
                });

            };

            // Delete user document
            $scope.deleteUserDoc = function(ev, doc) {
                var confirm = $mdDialog.confirm()
                    .title('Confirm if you want to delete the document?!')
                    .textContent('Once you delete the document, ' +
                        'there is no going back!')
                    .ariaLabel('Delete Document')
                    .targetEvent(ev)
                    .ok('Delete')
                    .cancel('Cancel');
                $mdDialog.show(confirm).then(function() {
                    Documents.remove({
                        id: doc._id
                    }, function() {
                        $scope.getUserDocs();
                        $scope.loadAllDocs();
                        $mdToast.show($mdToast.simple()
                            .textContent('Document Deleted').hideDelay(2000));
                    });
                }, function() {
                    $mdToast.show($mdToast.simple()
                        .textContent('Document Retained').hideDelay(2000));
                });
            };

            // Open Create/Update Document
            $scope.openOffscreen = function(ev, doc) {
                $rootScope.isUpdating = true;
                $rootScope.doc = doc;
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: '../views/form.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                });
            };

            // Open User Form to allow User to update his details
            $scope.openUserForm = function() {
                $mdSidenav('left').toggle();
            };

            $scope.closeUserForm = function() {
                $mdSidenav('left').close();
            };

            // Open all Users to update User by Admin
            $scope.updateUser = function(user) {
                if (user) {
                    user.password = $scope.userPassword;
                    Users.update(user, function(res) {
                        if (res) {
                            $mdToast.show($mdToast.simple()
                                .textContent('User Details Updated')
                                .hideDelay(2000));
                        }
                    });
                }
                Users.update($scope.user, function(res) {
                    $rootScope.currentUser = res.user;
                    $mdToast.show($mdToast.simple()
                        .textContent('User Details Updated')
                        .hideDelay(2000));
                    $scope.closeUserForm();
                });
            };

            function DialogController($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.answer = function(answer) {
                    $mdDialog.hide(answer);
                };
            }

        }
    ]);
