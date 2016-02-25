'use strict';

/**
 * @ngdoc service
 * @name accessControlApp.QRCode
 * @description
 * # QRCode
 * Service in the accessControlApp.
 */
angular.module('accessControlApp')
  .service('QRCode', ['Proxy' , function (Proxy) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    	this.sendItem = function(nameReq,courseReq, image){
    		var params = {name:nameReq, course:courseReq};
    		return Proxy.postCall(params,'https://api.parse.com/1/classes/access'); //Se debe regresar porque si no no llega hasta el promise
    	};

    	this.updateItem = function(objectId, imageReq){
    		var pic = {image:imageReq};
    		 return Proxy.putCall(pic,'https://api.parse.com/1/classes/access/' + objectId);
    	};

    	this.sendPicture = function(objectId, imageReq){
    		var param = {__ContentType: 'image/jpeg', base64: imageReq};
    		return Proxy.postCall(param,'https://api.parse.com/1/files/'+ objectId +'.jpg');
    	};

    	this.getItem = function(objectId){
    		return Proxy.getCall('https://api.parse.com/1/classes/access?where={"objectId":"'+objectId+'"}');
    	};

    	this.sendCheckInfo = function(objectId, checkInDate, checkOutDate, profilePic){
    		console.log("objectId = " + objectId);
    		var params = {};
    		if(checkOutDate){
    			checkOutDate = {__type:'Date',iso: moment(moment(checkOutDate)).utc().toISOString()};
    			params = {check_out:checkOutDate};
    		}
    		if(checkInDate){
    			checkInDate = {__type:'Date',iso: moment(moment(checkInDate)).utc().toISOString()};
    			params = {check_in:checkInDate, profile_picture: profilePic};
    		}
    		return Proxy.putCall(params,'https://api.parse.com/1/classes/access/' + objectId);
    	}

  }]);
