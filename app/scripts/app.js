'use strict';

/**
 * @ngdoc overview
 * @name accessControlApp
 * @description
 * # accessControlApp
 *
 * Main module of the application.
 */
angular
  .module('accessControlApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'camera',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/access.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/control', {
        templateUrl: 'views/control.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
