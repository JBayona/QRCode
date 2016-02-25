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
    'monospaced.qrcode',
    'qrScanner'
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
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run(['$rootScope','$location', function($rootScope, $location){
      $rootScope.$on('$routeChangeStart', function (event, next) {
        $rootScope.activeMenu = $location.url();
        if($location.url() === '/'){
          $rootScope.activeMenu = '/main'
        }else if($location.url() === '/control'){
          $rootScope.activeMenu = '/control'
        }
      });
  }]);
