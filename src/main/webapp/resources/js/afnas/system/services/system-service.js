define(["app"], function(app) {
    app.service("systemService", ["$rootScope", "$http", function($rootScope, $http) {
		"use strict";
        
		// property
		var self = this;

		// method
		self.getAfnasSmCollectTime = function () {
			return getData('/system/getAfnasSmCollectTime.json');
		};

		self.getAfnasSmProcess = function () {
			return getData('/system/getAfnasSmProcess.json');
		};

		self.getAfnasSmProcessTopicInfo = function () {
			return getData('/system/getAfnasSmProcessTopicInfo.json');
		};

		self.getAfnasSmServer = function () {
			return getData('/system/getAfnasSmServer.json');
		};

		self.getAfnasSmServerCheckInfo = function () {
			return getData('/system/getAfnasSmServerCheckInfo.json');
		};

		// event-handler


		// function
		function initialize() {    

		}
		
		function getData(url, parameter) {
			var promise = new Promise(function(resolve, reject) {
				$http({
					method : "POST",
					url : url,
					data : JSON.stringify(parameter),
					headers : {
						"Content-Type" : "application/json"
					},
					loader: true
				}).success(function(data, status, headers, config) {
					resolve(data.data);
				}).error(function(data, status, headers, config) {
					reject(status);
				});
			});
			return promise;
		}
        
		initialize();
	}]);
});