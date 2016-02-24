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

  	$scope.version = 4;
  	$scope.size = 274;
  	$scope.level = 'M';
    $scope.query = {};
    $scope.checkedIn = [];

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

  	$scope.getGuest = function(objectId){
  		QRCode.getItem(objectId).then(function(response){
          console.log(response);
          $scope.query = response.results[0];
          $scope.confirmation=true,
          $timeout(function(){$scope.confirmation=false},3000);
      });
  	};

    $scope.checkIn = function(){
      $scope.query.checkInTime = new Date();
      $scope.query.picture = $scope.vm.picture;
      $scope.checkedIn.push($scope.query);
      $scope.query = {}; //Limpiamos el query
    };

    $scope.checkOut = function(data){
      data.checkOutTime = new Date();
    }

  	 $scope.onSuccess = function(data) {
        console.log(data);
        $scope.getGuest(data); //Aquí vamos a leer el código QR que generamos
    };

    $scope.onError = function(error) {
        console.log(error);
    };

    $scope.onVideoError = function(error) {
        console.log(error);
    };
    
  }]);
