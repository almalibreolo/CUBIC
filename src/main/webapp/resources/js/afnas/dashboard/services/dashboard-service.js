define(["app"], function(app) {
	app.service("dashboardService", ["$rootScope", "$http", function($rootScope, $http) {
		"use strict";

		// property
		var self = this;

		// method
		self.getAllServiceList = function () {
			return getData('/dashboard/getAllServiceList.json');
		};

		self.getService = function (parameter) {
			return getData('/dashboard/getService.json', parameter);
		};

		self.getAllStatusList = function (parameter) {
			return getData('/common/getAllStatusList.json', parameter);
		};

		/*self.getServiceData = function (type, parameter) {
			return getData('/dashboard/getService' + type + '.json', parameter);
		};*/

		 /*self.getAllStatus = function() {
		 	return getData('/dashboard/getAllStatus.json');
	    };*/

	    self.getSelectServiceDetail = function (parameter){
	    	return getData('/dashboard/getSelectServiceDetail.json', parameter);
	    };

		/*self.getSelectHostDetail = function (parameter){
			return getData('/dashboard/getSelectHostDetail.json', parameter);
		};*/

		self.getAlarmStatus = function (){
			return getData('/dashboard/getAlarmStatus.json');
		};

		self.getStatusCluster = function () {
			return getData('/dashboard/getStatusCluster.json');
		};

		self.getHighestAlarmStatus = function (){
			return getData('/dashboard/getHighestAlarmStatus.json');
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
					// console.log('success', data, status, headers, config);
					// console.log(angular.toJson(data));
					resolve(data.data);
				}).error(function(data, status, headers, config) {
					// console.log('error', data, status, headers, config);
					reject(status);
				});
			});
			return promise;
		}

		initialize();
	}]);
});