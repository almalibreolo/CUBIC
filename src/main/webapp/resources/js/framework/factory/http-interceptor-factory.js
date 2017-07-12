define([], function() {
    return function($q) {
        'use strict';
        
        function ajaxErrorHandler(res) {
            if (res.status == '200' || res.statusText == "success") {
            	return;
            }

            var message = "";
            var location = "";
            var statusErrorMap = {
                '400': "400 Bad Request.",
                '401': "401 Unauthorized.",
                '403': "403 Forbidden.",
                '404': "404 Not Found.",
                '500': "500 Internal Server Error.",
                '503': "503 Service Unavailable.",
            };

            if (res.status) {
                message = statusErrorMap[res.status];
            } else {
            	message = "Unknown Error.";
            }
            
            alert(message);
        }

        function isSuccess(response) {
            if (response == null || response == "" || response == "undefined") {
                return false;
            }

            if (response.hasOwnProperty("result") == false)  {
            	return true;
            }
            
            if (response.result == 0) {
                if (response.errorMessage == null || response.errorMessage == "") {
                    alert("Unknown Error.");
                } else {
                    alert(response.errorMessage);
                }
                
                return false;
            }

            return true;
        }

        return {
            request: function(config) {  
            	var loader = false;
            	var loaderTarget = null;
             	if(config) {
        			if (config.loader == true || config.loader == "true") {
        				loader = true;
        			}
        			if (config.loaderTarget && config.loaderTarget != "") {
        				loaderTarget = config.loaderTarget;
        			}
            	}
            	
            	if(loader) {
            		showIndicator(loaderTarget);
            	}
            	
                return config || $q.when(config);
            },
            
            requestError: function(request) {
                lazyHideIndicator();
                return $q.reject(request);
            },
            
            response: function(response) {
                lazyHideIndicator();
                var contentType = response.headers()['content-type'];
                if (contentType && (contentType.indexOf("application/json") > -1 || contentType.indexOf("application/x-www-form-urlencoded") > -1)) {
                    var data = isSuccess(response.data);
                    if (!data) { return $q.reject(response); }
                }
                
                return response || $q.when(response);
            },
            
            responseError: function(rejection) {
                lazyHideIndicator();
                ajaxErrorHandler(rejection);
                return $q.reject(rejection);
            }
        }
    }
});