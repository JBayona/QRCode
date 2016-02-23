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

  	$scope.version = 10;
  	$scope.size = 150;
  	$scope.level = 'M';


  	$scope.getCode = function(){
  		QRCode.sendItem($scope.credentials.name, $scope.credentials.course, $scope.vm.picture)
  		.then(function(response){
  			console.log(response);
  			$scope.idData = response.objectId;
  			var pic = $scope.vm.picture.split("base64,")[1];
  			//console.log(pic);
  			QRCode.sendPicture($scope.idData, pic).then(function(response){
  				//console.log("Pic=" + response);
  				QRCode.updateItem($scope.idData, response.url); //En response.url obtenemos la url donde se almacena la imagen
  			})
  		},function(error){
  			console.log(error);
  		});
  	}

  	/*$scope.getGuest = function(){
  		QRCode.getItem()
  	}*/

  	 $scope.onSuccess = function(data) {
        console.log(data);
    };

    $scope.onError = function(error) {
        console.log(error);
    };
    
  }]);
