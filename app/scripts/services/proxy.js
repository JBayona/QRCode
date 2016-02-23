'use strict';

/**
 * @ngdoc service
 * @name accessControlApp.Proxy
 * @description
 * # Proxy
 * Service in the accessControlApp.
 */
angular.module('accessControlApp')
  .service('Proxy', ['$q', '$http', function ($q,$http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var restCall = function(method, data, url, params, headers, external){
    	var defer = $q.defer(); //creating a new instance
    	var reqHeaders = external ? {} : {
    		'X-Parse-Application-Id' : 'YpAU5NRmVNBRxpHbgAs2IF5P3CwTH4he6yJqGeAv',
    		'X-Parse-REST-API-Key' : '4kXy26eOFwt6bFLprYqxRbhFZHPKY2MVa0fFQ48E',
    		'Content-Type' : 'application/json'
    	};

    	if(headers){
    		angular.forEach(headers, function(key, value){
    			reqHeaders[key] = value;
    		});
    	}

    	var req = { //We create our req that will have all of this parameters
    		method: method,
    		url, url,
    		headers: reqHeaders,
    		data: data,
    		params: params
    	};

    	$http(req).
    		success(function(data, status, headers, config){
    			defer.resolve(data); //resolves the derived promise with the value.
    		}).
    		error(function(data,statis, headers,config){
    			defer.reject(data); //rejects the derived promise with the reason
    		});

    	return defer.promise; //promise object associated with this deferred
    };

    var getCall = function(url, params, headers){
    	params = params ? params : {};
    	return restCall('GET', {}, url, params, headers)
    };

    var postCall = function(data, url, headers){
    	return restCall('POST', data, url, {}, headers);
    };

    var putCall =function(data, url){
    	return restCall('PUT', data, url);
    };

    var getExternalCall = function(url,params,headers){
    	return restCall('GET', {}, url, params, headers, true);
    };

    var deleteCall = function(data,url){
    	return restCall('DELETE', data, url);
    }

    //Purpose
    return{
    	postCall : postCall,
    	putCall : putCall,
    	getCall : getCall,
    	getExternalCall : getExternalCall,
    	deleteCall : deleteCall
    }

  }]);
