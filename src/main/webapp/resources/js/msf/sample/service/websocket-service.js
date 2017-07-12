define(["app"], function(app) {
    app.service("WebSocketService", ["$rootScope", "$http", "ConfigManager", function($rootScope, $http, ConfigManager) {
		"use strict";
        
		// property
		var worker = null;
    	
		// method
    	this.connect = function(url) {
			worker.postMessage({
	            operation: "connect",
	            url:url
	        });
    	}
    	
		this.close = function() {
			worker.postMessage({
	            operation: "close"
	        });			
		}

		// event-handler

		// function
		function initialize() {
    		worker = new Worker("/resources/js/msf/sample/common/web-socket-worker.js");
        	worker.onmessage = function(e) {
        		$rootScope.$broadcast(ConfigManager.getEvent("SAMPLE_WEBSOCKET_RECEIVE_EVENT"), e.data);
        	};
		}

        initialize();
	}]);
});