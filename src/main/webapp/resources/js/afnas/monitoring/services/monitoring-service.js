define(["app"], function(app) {
    app.service("monitoringService", ["$rootScope", "$http", function($rootScope, $http) {
		"use strict";
        
		// property
		var self = this;

		// method
		self.getCmSystemProcess = function () {
			return getData('/monitoring/getCmSystemProcess.json');
		};

		self.getHmKafkaserverTopicStatus = function () {
			return getData('/monitoring/getHmKafkaserverTopicStatus.json');
		};

		self.getHmUiRequestHistoryCount = function () {
			return getData('/monitoring/getHmUiRequestHistoryCount.json');
		};

		/*self.getCountKafkaEvents = function () {
			return getData('/monitoring/getCountKafkaEvents.json');
		};

		self.getCountMariaDBMetrics = function () {
			return getData('/monitoring/getCountMariaDBMetrics.json');
		};

		self.getCountElasticLogs = function () {
			return getData('/monitoring/getCountElasticLogs.json');
		};

		self.getCountAlarms = function () {
			return getData('/monitoring/getCountAlarms.json');
		};

		self.getCountConnections = function () {
			return getData('/monitoring/getCountConnections.json');
		};

		self.getCountElastic = function () {
			return getData('/monitoring/getCountElastic.json');
		};*/

		self.getDBDiskUsage = function () {
			return getData('/monitoring/getDBDiskUsage.json');
		};

		self.getDBList = function () {
			return getData('/monitoring/getDBList.json');
		};

		self.getSixHourKafkaData = function () {
			return getData('/monitoring/getSixHourKafkaData.json');
		};

		self.getSixHourSystemData = function () {
			return getData('/monitoring/getSixHourSystemData.json');
		};

		self.getSixHourMemoryData = function () {
			return getData('/monitoring/getSixHourMemoryData.json');
		};

		self.getSixHourNetworkData = function () {
			return getData('/monitoring/getSixHourNetworkData.json');
		};

		self.getSixHourDiskData = function () {
			return getData('/monitoring/getSixHourDiskData.json');
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
					}
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