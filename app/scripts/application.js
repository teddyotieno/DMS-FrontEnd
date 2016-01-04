(function() {
  'use strict';
  angular.module('dms.controllers', []);
  angular.module('dms.services', []);

  // Require Controllers
  require('./controllers/welcome');
  require('./controllers/signup');
  require('./controllers/header');

  // Require Services
  require('./services/auth');
  require('./services/token');
  require('./services/user');



  window.app = angular.module('dms', [
    'dms.controllers',
    'dms.services',
    'ngRoute',
    'ui.router',
    'ngResource',
    'ngMessages',
    'ngMaterial',
  ]);

  window.app.run(['$rootScope', '$location', '$state',
    function($rootScope) {

      $rootScope.menu = [{
        name: 'Home',
        state: 'home'
      }, {
        name: 'About',
        state: 'about'
      }, {
        name: 'Documents',
        state: 'documents'
      }, ];
    }
  ]);

  window.app.config(['$stateProvider', '$httpProvider',
    '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $httpProvider, $urlRouterProvider,
      $locationProvider) {

      // For any unmatched url, redirect to /state1
      $urlRouterProvider.otherwise('/404');

      $stateProvider
        .state('home', {
          url: '/',
          controller: 'WelcomeCtrl',
          templateUrl: 'views/home.html'
        })
        .state('about', {
          url: '/about',
          controller: 'AboutCtrl',
          templateUrl: 'views/about.html'
        })
        .state('documents', {
          url: '/documents',
          controller: 'DocumentsCtrl',
          templateUrl: 'views/documents.html'
        })
        .state('signup', {
          url: '/signup',
          controller: 'SignUpCtrl',
          templateUrl: 'views/signup.html'
        })
        .state('login', {
          url: '/users/login',
          controller: 'LoginCtrl',
          templateUrl: 'views/login.html'
        })
        .state('404', {
          url: '/404',
          templateUrl: 'views/404.html'
        });
      $locationProvider.html5Mode(true);
    }
  ]);

})();
