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
  			});
  		},function(error){
  			console.log(error);
  		});
  	}

  	$scope.getGuest = function(objectId){ //Como generamos id, leemos Id en el código QR
  		QRCode.getItem(objectId).then(function(response){
          console.log(response);
          $scope.query = response.results[0]; //En esta variable tenemos el resultado del Get
          $scope.confirmation=true,
          $timeout(function(){$scope.confirmation=false},3000);
      });
  	};

    $scope.checkIn = function(){
      //console.log("Here =" + $scope.query.objectId);
      var profilePic = $scope.vm.picture.split("base64,")[1];
      $scope.query.picture = $scope.vm.picture;
      $scope.query.checkInTime = moment().utc().add(-6,'hours');
      $scope.query.checkInTimeView = moment().utc().add(-6,'hours').format('MMMM Do YYYY, h:mm:ss a');
      $scope.checkedIn.push($scope.query);
      QRCode.sendPicture($scope.query.objectId+"Profile", profilePic).then(function(response){
			 //En response.url obtenemos la url donde se almacena la imagen
  	  		 QRCode.sendCheckInfo($scope.query.objectId, $scope.query.checkInTime, null ,response.url).then(function(response){
		      	console.log("Success");
		     });
  	  });
    };

    $scope.checkOut = function(data){
      data.checkOutTime = moment().utc().add(-6,'hours');
      data.checkOutTimeView = moment().utc().add(-6,'hours').format('MMMM Do YYYY, h:mm:ss a');
      QRCode.sendCheckInfo($scope.query.objectId, null, data.checkOutTime, null).then(function(response){
		    console.log("Success");
		    $scope.query = {}; //Limpiamos el query
	  });
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
