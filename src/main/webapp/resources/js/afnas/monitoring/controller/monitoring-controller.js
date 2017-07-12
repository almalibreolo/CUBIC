define(["app", "moment"], function(app, moment) {
	app.controller("monitoringCtrl", ["$scope", "$q", "$filter", 'monitoringService', 'AlarmManager', function($scope, $q, $filter, monitoringService, AlarmManager) {
		"use strict";

		// property
		var self = this;

		const TIME_FORMAT = "HH:mm:ss";
		const SORT_TYPE_PROCESS = "process";
		const SORT_TYPE_SYSTEM = "system";

		self.systemList = [];
		self.overviewList = [];
		self.overviewSortType = SORT_TYPE_PROCESS;
		self.overviewSearchText = "";

		self.countKafkaEvents = 0;
		self.countMariaDBMetrics = 0;
		self.countElasticLogs = 0;
		self.countAlarms = 0;
		self.countRequests = 0;

		self.errorCollectd = 0;
		self.errorFilebeat = 0;
		self.errorKafka = 0;
		self.errorEventManager = 0;
		self.errorSpark = 0;
		self.errorMariaDB = 0;
		self.errorElastic = 0;

		self.mariaDbDiskUsage = 0;	// 59.9GB
		self.mariaDbList = [];
		self.elasticSearchDiskUsage = 0;	// 59.9GB
		self.elasticSearchList = [];
		self.kafkaList = [];

		self.seletedChartTab = 0;

		self.chartTitleKafka = "Kafka";
		self.chartDataKafka = { categories: [], series: [] };

		self.chartTitleSystem = "System";
		self.chartDataSystem = { categories: [], series: [] };

		self.chartTitleMemory = "Memory";
		self.chartDataMemory = { categories: [], series: [] };

		self.chartTitleNetwork = "Network";
		self.chartDataNetwork = { categories: [], series: [] };

		self.chartTitleDisk = "Disk";
		self.chartDataDisk = { categories: [], series: [] };


		// method
		self.changeOverviewSortType = function (type) {
			console.log('monitoring : changeOverviewSortType :', type);
			self.overviewSortType = type;
			drawOverview();
		};

		self.clickOverviewSearch = function () {

		};


		// event-handler


		// function
		function clearCount() {
			self.countKafkaEvents = 0;
			self.countMariaDBMetrics = 0;
			self.countElasticLogs = 0;
			self.countRequests = 0;
		}

		function clearError() {
			self.errorCollectd = 0;
			self.errorFilebeat = 0;
			self.errorKafka = 0;
			self.errorEventManager = 0;
			self.errorSpark = 0;
			self.errorMariaDB = 0;
			self.errorElastic = 0;
		}

		function getOverview() {
			monitoringService.getCmSystemProcess().then(function (data) {
				console.log("monitoring : getCmSystemProcess :", data);

				self.systemList = [];
				if(data) {
					self.systemList = data;
					drawOverview();
					drawError();
				}
			});
		}

		function getCount() {
			AlarmManager.getAlarmStatistics().then(function(e) {
				console.log("monitoring : AlarmManager.getAlarmStatistics :", e);

				self.countAlarms = 0;
				if (e && e.total) {
					self.countAlarms = parseInt(e.total);
				}
			});

			$q.all([monitoringService.getHmKafkaserverTopicStatus(), monitoringService.getHmUiRequestHistoryCount()]).then(function (data) {
				console.log("monitoring : get Couny Data :", data);

				clearCount();
				self.kafkaList = [];

				if(data && data.length == 2) {
					if(data[0].length) {
						self.kafkaList = data[0];

						for (let i = 0, l = data[0].length; i < l; ++i) {
							self.countKafkaEvents += parseInt(data[0][i].messagesinpersec);
							if (data[0][i].topic.toLowerCase() == 'collectd' || data[0][i].topic.toLowerCase() == 'gluster')
								self.countMariaDBMetrics += parseInt(data[0][i].messagesinpersec);
							else if (data[0][i].topic.toLowerCase() == 'log')
								self.countElasticLogs += parseInt(data[0][i].messagesinpersec);
						}
					}

					self.countRequests = data[1];

					ap($scope);
				}

			});
		}

		function getList() {
			$q.all([monitoringService.getDBDiskUsage(), monitoringService.getDBList()]).then(function (data) {
				console.log("monitoring : get DB List Data :", data);
				if(data && data.length == 2) {
					self.mariaDbDiskUsage = data[0];

					let list = data[1];
					/*for(var i=0, l=list.length; i<l; ++i){
						list[i].dataSizeCM = $filter('byteFormat')(list[i].dataSize, 2);
						list[i].indexSizeCM = $filter('byteFormat')(list[i].indexSize, 2);
						list[i].dataSizeCF = $filter('floatFormat')(list[i].dataSize, 2);
						list[i].indexSizeCF = $filter('floatFormat')(list[i].indexSize, 2);
					}*/
					self.mariaDbList = list;
				}
			});
		}

		function getChartData() {
			monitoringService.getSixHourKafkaData().then(function (data) {
				console.log("monitoring : getSixHourKafkaData :", data);

				self.chartDataKafka = { categories: [], series: [ {name: 'bytesinpersec', data:[] }, {name: 'bytesoutpersec', data:[] }, {name: 'totalfetchrequestspersec', data:[] }, {name: 'underreplicatedpartitions', data:[] } ] };

				if(data) {
					for(var i=0, l=data.length; i<l; ++i) {
						// self.chartDataKafka.categories.push(moment(data[i].collectTime));
						self.chartDataKafka.categories.push(moment(data[i].collectTime).local().format(TIME_FORMAT));
						self.chartDataKafka.series[0].data.push(parseInt(data[i].bytesinpersec));
						self.chartDataKafka.series[1].data.push(parseInt(data[i].bytesoutpersec));
						self.chartDataKafka.series[2].data.push(parseInt(data[i].totalfetchrequestspersec));
						self.chartDataKafka.series[3].data.push(parseInt(data[i].underreplicatedpartitions));
					}
					ap($scope);
				}
			});

			monitoringService.getSixHourSystemData().then(function (data) {
				console.log("monitoring : getSixHourSystemData :", data.length);

				self.chartDataSystem = { categories: [], series: [] };

				if(data) {
					let series = {};
					for(var i=0, l=data.length; i<l; ++i) {
						var time = moment(data[i].collectTime).local().format(TIME_FORMAT);
						if(self.chartDataSystem.categories.indexOf(time) < 0) {
							self.chartDataSystem.categories.push(time);
						}

						if(!series[data[i].systemName])
							series[data[i].systemName] = [];

						series[data[i].systemName].push(parseFloat(data[i].cpuIdleCalc));
					}

					angular.forEach(series, function (value, key) {
						self.chartDataSystem.series.push({name: key, data:value });
					});
				}
			});

			monitoringService.getSixHourMemoryData().then(function (data) {
				console.log("monitoring : getSixHourMemoryData :", data.length);

				self.chartDataMemory = { categories: [], series: [] };

				if(data) {
					let series = {};
					for (var i = 0, l = data.length; i < l; ++i) {
						if(self.chartDataMemory.categories.indexOf(moment(data[i].collectTime).local().format(TIME_FORMAT)) < 0) {
							self.chartDataMemory.categories.push(moment(data[i].collectTime).local().format(TIME_FORMAT));
						}

						if(!series[data[i].systemName])
							series[data[i].systemName] = [];

						series[data[i].systemName].push(parseFloat(data[i].memoryUsedPct));
					}

					angular.forEach(series, function (value, key) {
						self.chartDataMemory.series.push({name: key, data:value });
					});
				}
			});

			monitoringService.getSixHourNetworkData().then(function (data) {
				console.log("monitoring : getSixHourNetworkData :", data.length);

				self.chartDataNetwork = {categories: [], series: []};

				if (data) {
					let series = {};
					for (var i = 0, l = data.length; i < l; ++i) {
						if(self.chartDataNetwork.categories.indexOf(moment(data[i].collectTime).local().format(TIME_FORMAT)) < 0) {
							self.chartDataNetwork.categories.push(moment(data[i].collectTime).local().format(TIME_FORMAT));
						}

						if(!series[data[i].systemName+"-rx"])
							series[data[i].systemName+"-rx"] = [];
						if(!series[data[i].systemName+"-tx"])
							series[data[i].systemName+"-tx"] = [];

						series[data[i].systemName+"-rx"].push(parseFloat(data[i].ifOctetsRx));
						series[data[i].systemName+"-tx"].push(parseFloat(data[i].ifOctetsTx));
					}

					angular.forEach(series, function (value, key) {
						self.chartDataNetwork.series.push({name: key, data:value });
					});
				}
			});

			monitoringService.getSixHourDiskData().then(function (data) {
				console.log("monitoring : getSixHourDiskData :", data.length);

				self.chartDataDisk = { categories: [], series: [] };

				if(data) {
					let series = {};
					for (var i = 0, l = data.length; i < l; ++i) {
						if(self.chartDataDisk.categories.indexOf(moment(data[i].collectTime).local().format(TIME_FORMAT)) < 0) {
							self.chartDataDisk.categories.push(moment(data[i].collectTime).local().format(TIME_FORMAT));
						}

						if(!series[data[i].systemName])
							series[data[i].systemName] = [];

						series[data[i].systemName].push(parseFloat(data[i].dfUsed));
					}

					angular.forEach(series, function (value, key) {
						self.chartDataDisk.series.push({name: key, data:value });
					});
				}
			});
		}

		function drawOverview() {
			self.overviewList = [];

			for(var i=0, il=self.systemList.length; i<il; ++i) {
				if(self.overviewSortType == SORT_TYPE_SYSTEM) {
					var flag = self.overviewList.every(function (system) {
						return (system.name == self.systemList[i].systemName)? false: true;
					});
					if(flag == true)
						self.overviewList.push({name: self.systemList[i].systemName, data: []});

					for(var j=0, jl=self.overviewList.length; j<jl; ++j) {
						if(self.systemList[i].systemName == self.overviewList[j].name) {
							self.overviewList[j].data.push(self.systemList[i]);
						}
					}
				} else {
					var flag = self.overviewList.every(function (system) {
						return (system.name == self.systemList[i].processName)? false: true;
					});
					if(flag == true)
						self.overviewList.push({name: self.systemList[i].processName, data: []});

					for(var j=0, jl=self.overviewList.length; j<jl; ++j) {
						if(self.systemList[i].processName == self.overviewList[j].name) {
							self.overviewList[j].data.push(self.systemList[i]);
						}
					}
				}
			}

			self.overviewList.sort(function(a, b) {
				if (a.name < b.name)
					return -1;
				if (a.name > b.name)
					return 1;
				return 0;
			});

			ap($scope);
		}

		function drawError() {
			clearError();

			for(var i=0, il=self.systemList.length; i<il; ++i) {
				let processName = self.systemList[i].processName.toLowerCase();
				switch (processName) {
					case "collectd":
						if( self.systemList[i].processStatus.toLowerCase() != "alive")
							self.errorCollectd ++;
						break;
					case "filebeat":
						if( self.systemList[i].processStatus.toLowerCase() != "alive")
							self.errorFilebeat ++;
						break;
					case "kafka":
						if( self.systemList[i].processStatus.toLowerCase() != "alive")
							self.errorKafka ++;
						break;
					case "eventmanager":
						if( self.systemList[i].processStatus.toLowerCase() != "alive")
							self.errorEventManager ++;
						break;
					case "spark":
						if( self.systemList[i].processStatus.toLowerCase() != "alive")
							self.errorSpark ++;
						break;
					case "mysql":
						if( self.systemList[i].processStatus.toLowerCase() != "alive")
							self.errorMariaDB ++;
						break;
					case "elastic":
						if( self.systemList[i].processStatus.toLowerCase() != "alive")
							self.errorElastic ++;
						break;
				}
			}
		}


		function initialize() {    
			initializeEventHandler();

			getOverview();
			getCount();
			getList();
			getChartData();
		}
		
		function initializeEventHandler() {
			
		}
		
		initialize();
	}]);
});