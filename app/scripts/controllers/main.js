'use strict';

/**
 * @ngdoc function
 * @name accessControlApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the accessControlApp
 */
angular.module('accessControlApp')
  .controller('MainCtrl', ['$scope', 'QRCode', '$timeout', function ($scope, QRCode, $timeout) {

  	$scope.getCode = function(){
  		QRCode.sendItem($scope.credentials.name, $scope.credentials.course, $scope.vm.picture)
  		.then(function(response){
  			console.log(response);
  			$scope.idData = response.objectId;
  		},function(error){
  			console.log(error);
  		});
  	}
    
  }]);
