define(["app"], function(app) {
	app.controller("WebSocketCtrl",  ["$scope", "ConfigManager", "WebSocketService", function($scope, ConfigManager, WebSocketService) {
		"use strict";

		// property
		var webSocketCtrl = this;		
		webSocketCtrl.data = [];
		webSocketCtrl.autoScroll = true;

		// method


		// event-handler
		function onSampleWebSocketReceiveEventHandler(event, data) {
			data.num = webSocketCtrl.data.length;
			webSocketCtrl.data.push(data);
			
			if ((webSocketCtrl.data.length % 10) === 0) {
				ap($scope);
				$.validLayout("content");
				
				if (webSocketCtrl.autoScroll) {
					$("#content").scrollTop($("#content")[0].scrollHeight);
				}
			}
		}


		// function
		function initialize() {
			angular.element(document).ready(function() {
				$.validLayout();
			});
			
			initializeEventHandler();
		}

		function initializeEventHandler() {
			$scope.$on(ConfigManager.getEvent("SAMPLE_WEBSOCKET_RECEIVE_EVENT"), onSampleWebSocketReceiveEventHandler);
			$scope.$on("$destroy", function() {
				WebSocketService.close();
			});
			
			WebSocketService.connect(ConfigManager.getConst("SOCKET_URL"));
		}
		
		initialize();
	}]);
});