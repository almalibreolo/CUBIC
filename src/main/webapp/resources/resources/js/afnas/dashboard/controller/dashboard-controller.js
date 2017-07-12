define(["app", "moment"], function (app, moment) {
	app.controller("DashboardCtrl", ["$rootScope", "$scope", "$timeout", "$compile", "ngDialog", "dashboardService", "uiGridConstants", "ConfigManager",
		function ($rootScope, $scope, $timeout, $compile, ngDialog, dashboardService, uiGridConstants, ConfigManager) {
			"use strict";

			// property
			var dashboardCtrl = this;
			var unbind = [];

			dashboardCtrl.disableColor = "#c8c8c8";
			dashboardCtrl.refreshType = 2;		// 0:x, 1:1회, other: polling

			// init data
			dashboardCtrl.cmSystemInfo;
			dashboardCtrl.afnasInfoService;
			dashboardCtrl.gfInfoVolume;
			dashboardCtrl.gfInfoVolnhost;

			dashboardCtrl.statusServiceList;
			dashboardCtrl.statusVolumeList;
			dashboardCtrl.statusHostList;

			dashboardCtrl.highestAlarmStatus;

			// status data
			dashboardCtrl.statusService;
			dashboardCtrl.statusVolume;
			dashboardCtrl.statusHost;

			dashboardCtrl.statusSizeCurrent;
			dashboardCtrl.statusSizeMax;
			dashboardCtrl.statusSizeTotal;
			dashboardCtrl.statusSizeStyle;
			dashboardCtrl.statusSizeMaxStyle;
			dashboardCtrl.statusConnectionCurrent;
			dashboardCtrl.statusConnectionMax;
			dashboardCtrl.statusConnectionStyle;
			dashboardCtrl.statusThroughtputCurrent;
			dashboardCtrl.statusThroughtputMax;
			dashboardCtrl.statusThroughtputStyle;

			dashboardCtrl.alarmSeverityList = ["normal", "minor", "major", "critical"];
			dashboardCtrl.viewTypeList = ["severity", "usage", "grid"];
			dashboardCtrl.viewType = dashboardCtrl.viewTypeList[0];

			dashboardCtrl.gridOptions = null;

			dashboardCtrl.selectedServiceList;
			dashboardCtrl.selectedVolumeList;
			dashboardCtrl.selectedHostList;

			dashboardCtrl.clickedResourceType;
			dashboardCtrl.clickedResourceList;

			dashboardCtrl.alarmFilter;
			dashboardCtrl.clickedAlarm;

			var resourceType = ["service", "volume", "host"];
			var sortType = ["alarmSeverity", "usedCapacity", "capacityPercent"];


			// method
			dashboardCtrl.refreshData = function () {
				console.log("dashboard : refreshData");

				getAlarmStatus();
				getStatusCluster();

				getAllStatusList().then(function () {
					setAllCheckServiceList(false);
					setAllCheckVolumeList(false);

					getHighestAlarmStatus().then(function () {
						drawService(sortType[0]);
						drawVolume(sortType[0]);
						drawHost();

						initClickedResource();

						//TODO. 여기 정리
						var default_service = dashboardCtrl.selectedServiceList ? dashboardCtrl.selectedServiceList : [dashboardCtrl.statusServiceList[0]];
						var default_volume = dashboardCtrl.selectedVolumeList ? dashboardCtrl.selectedVolumeList : getVolumeByServiceList(default_service);
						var default_host = dashboardCtrl.selectedHostList ? dashboardCtrl.selectedHostList : getHostByVolumeList(default_volume);
						setSelectedService(default_service);
						setSelectedVolume(default_volume);
						setSelectedHost(default_host);

						setAlarmFilter(default_volume);
						channgeServiceViewType();
						drawSelectHostDetail();
						ap($scope);
					});
				});
			};

			dashboardCtrl.refreshDraw = function () {
				console.log("dashboard : refreshDraw");
				getAlarmStatus();
				getStatusCluster();

				getHighestAlarmStatus().then(function () {
					drawService(sortType[0]);
					drawVolume(sortType[0]);
					drawHost();

					channgeServiceViewType();
					ap($scope);
				});
			};

			dashboardCtrl.getInitData = function () {
				return dashboardService.getAllServiceList().then(function (data) {
					console.log("dashboard : getAllServiceList :", data);
					if (data) {
						dashboardCtrl.cmSystemInfo = data.cmSystemInfo;
						dashboardCtrl.afnasInfoService = data.afnasInfoService;
						dashboardCtrl.gfInfoVolume = data.gfInfoVolume;
						dashboardCtrl.gfInfoVolnhost = data.gfInfoVolnhost;
					}
				});
			};

			dashboardCtrl.changeViewType = function (type) {
				if (dashboardCtrl.viewType == type)
					return;

				dashboardCtrl.viewType = type;
				channgeServiceViewType();
			};

			dashboardCtrl.clickService = function ($event, service) {
				console.log("dashboard : clickService :", service);

				dashboardCtrl.clickedAlarm = false;

				if (angular.equals(dashboardCtrl.selectedServiceList, [service])) {
					setClickedResource();
					console.log("dashboard : clickService : [[[[[ service 1 ]]]]]", dashboardCtrl.clickedResourceList);

					setAlarmFilter();
					setSelectedService([]);
					setSelectedVolume([]);
					setSelectedHost([]);
				} else if ($event.ctrlKey) {
					setClickedResource(service, resourceType[0], true);
					console.log("dashboard : clickService : [[[[[ service 2 ]]]]]", dashboardCtrl.clickedResourceList);

					var service_list = dashboardCtrl.clickedResourceList;
					setAlarmFilter(service_list);
					setSelectedService(service_list);
					setSelectedVolume(getVolumeByServiceList(service_list));
					setSelectedHost(getHostByVolumeList(getVolumeByServiceList(service_list)));
				} else {
					setClickedResource(service, resourceType[0]);
					console.log("dashboard : clickService : [[[[[ service 3 ]]]]]", dashboardCtrl.clickedResourceList);

					var service_list = dashboardCtrl.clickedResourceList;
					setAlarmFilter(service_list);
					setSelectedService(service_list);
					setSelectedVolume(getVolumeByServiceList(service_list));
					setSelectedHost(getHostByVolumeList(getVolumeByServiceList(service_list)));
				}

				drawSelectHostDetail();

				ap($scope);
			};

			dashboardCtrl.clickVolume = function ($event, volume) {
				console.log("dashboard : clickVolume :", volume);

				dashboardCtrl.clickedAlarm = false;

				if (angular.equals(dashboardCtrl.selectedVolumeList, [volume])) {
					setClickedResource();
					console.log("dashboard : clickVolume : [[[[[ volume 1 ]]]]]", dashboardCtrl.clickedResourceList);

					setAlarmFilter();
					setSelectedService([]);
					setSelectedVolume([]);
					setSelectedHost([]);
				} else if ($event.ctrlKey) {
					setClickedResource(volume, resourceType[1], true);

					var volume_list = dashboardCtrl.clickedResourceList;
					console.log("dashboard : clickVolume : [[[[[ volume 2 ]]]]]", volume_list);
					setAlarmFilter(volume_list);
					setSelectedService(getServiceByVolumeList(volume_list));
					setSelectedVolume(volume_list);
					setSelectedHost(getHostByVolumeList(volume_list));
				} else {
					setClickedResource(volume, resourceType[1]);

					var volume_list = dashboardCtrl.clickedResourceList;
					console.log("dashboard : clickVolume : [[[[[ volume 3 ]]]]]", volume_list);
					setAlarmFilter(volume_list);
					setSelectedService(getServiceByVolumeList(volume_list));
					setSelectedVolume(volume_list);
					setSelectedHost(getHostByVolumeList(volume_list));
				}

				drawSelectHostDetail();
				ap($scope);
			};

			dashboardCtrl.clickHost = function ($event, host) {
				console.log("dashboard : clickHost :", host);

				dashboardCtrl.clickedAlarm = false;

				if (dashboardCtrl.selectedHostList && angular.equals(dashboardCtrl.selectedHostList, [host])) {
					setClickedResource();
					console.log("dashboard : clickHost : [[[[[ host 1 ]]]]]", dashboardCtrl.clickedResourceList);

					setAlarmFilter();
					setSelectedService([]);
					setSelectedVolume([]);
					setSelectedHost([]);
				} else if ($event.ctrlKey) {
					setClickedResource(host, resourceType[2], true);

					var host_list = dashboardCtrl.clickedResourceList;
					console.log("dashboard : clickHost : [[[[[ host 2 ]]]]]", host_list);
					setAlarmFilter(host_list);
					setSelectedService(getServiceByHostList(host_list));
					setSelectedVolume(getVolumeByHostList(host_list));
					setSelectedHost(host_list);
				} else {
					setClickedResource(host, resourceType[2]);

					var host_list = dashboardCtrl.clickedResourceList;
					console.log("dashboard : clickHost : [[[[[ host 3 ]]]]]", host_list);
					setAlarmFilter(host_list);
					setSelectedService(getServiceByHostList(host_list));
					setSelectedVolume(getVolumeByHostList(host_list));
					setSelectedHost(host_list);
				}

				drawSelectHostDetail();
				ap($scope);
			};

			dashboardCtrl.clickHostList = function (id) {
				console.log("dashboard : clickHostList", id);
				var selector = angular.element("#list_" + id);
				angular.element(".host-list .active").removeClass("active");
				selector.addClass("active");

				$timeout(function () {
					removeNodeDetailScrollSyncToNodeList();
					selectScrolling("#content_" + id, ".host-content.mu-scroll-v", 1, setNodeDetailScrollSyncToNodeList);
					angular.element(".host-content-table").removeClass("active");
					angular.element("#content_" + id).addClass("active");
				}, 100);
			};

			dashboardCtrl.clickServiceDetail = function ($event, service) {
				console.log("dashboard : clickServiceDetail", service);

				$event.stopPropagation();
				showPopup(resourceType[0], service);
			};

			dashboardCtrl.clickVolumeDetail = function ($event, volume) {
				console.log("dashboard : clickVolumeDetail", volume);

				$event.stopPropagation();
				showPopup(resourceType[1], volume);
			};

			dashboardCtrl.onSelectedAlarm = function (t, e, data) {
				dashboardCtrl.clickedAlarm = true;
				setSelectedAlarm(e, data);
			};

			// polling
			dashboardCtrl.setPolling = function () {
				dashboardCtrl.refreshType = (dashboardCtrl.refreshType == 0) ? 2 : 0;
			};

			dashboardCtrl.isPolling = function () {
				return (dashboardCtrl.refreshType != 0 && dashboardCtrl.refreshType != 1) ? true : false;
			};


			// event-handler
			var isRefresh = false;

			function onOccuredAlarm(e, data) {
				console.log("dashboard : event : OCCURED_ALARM :", e, data);
				if (isRefresh)
					return;

				isRefresh = true;
				$timeout(function () {
					isRefresh = false;
					dashboardCtrl.refreshDraw();
				}, 3000);
			}


			// function
			function initialize() {
				initializeEventHandler();
				angular.element(document).ready(function () {
					setSpliiter(".mu-splitter.left", ".mu-panel-service.mu-splitter-first", ".mu-panel-alarm.mu-splitter-last", 250, 100);
					setSpliiter(".mu-splitter.right", ".host-wrap.mu-splitter-first", ".host-info.mu-splitter-last", 400, 180);
				});

				dashboardCtrl.gridOptions = getGridOption([]);
				dashboardCtrl.clickedResourceList = [];

				dashboardCtrl.getInitData().then(function () {
					dashboardCtrl.refreshData();
				});
			}

			function initializeEventHandler() {
				unbind = [
					$rootScope.$on(ConfigManager.getEvent("OCCURED_ALARM"), onOccuredAlarm),
					$rootScope.$on(ConfigManager.getEvent("SELECTED_ALARM"), dashboardCtrl.onSelectedAlarm)
				];

				$scope.$on("$destroy", function () {
					dashboardCtrl.refreshType = 0;

					unbind.forEach(function (fn) {
						fn();
					});
				});

				setNodeDetailScrollSyncToNodeList();
			}

			function getAlarmStatus() {
				return dashboardService.getAlarmStatus().then(function (e) {
					console.log("dashboard : getAlarmStatus :", e);
					if (e) {
						dashboardCtrl.statusService = {
							normalCount: parseInt(e.svcAlarmTotal) - parseInt(e.svcAlarmCount),
							abnormalCount: parseInt(e.svcAlarmCount)
						};
						dashboardCtrl.statusVolume = {
							normalCount: parseInt(e.volAlarmTotal) - parseInt(e.volAlarmCount),
							abnormalCount: parseInt(e.volAlarmCount)
						};
						dashboardCtrl.statusHost = {
							normalCount: parseInt(e.hostAlarmTotal) - parseInt(e.hostAlarmCount),
							abnormalCount: parseInt(e.hostAlarmCount)
						};
						ap($scope);
					}
				});
			}

			function getStatusCluster() {
				return dashboardService.getStatusCluster().then(function (e) {
					console.log("dashboard : getStatusCluster :", e);
					if (e) {
						dashboardCtrl.statusSizeCurrent = e.usedCapacity;
						dashboardCtrl.statusSizeMax = e.maxCapacity;
						dashboardCtrl.statusSizeTotal = e.usableCapacity;
						dashboardCtrl.statusSizeStyle = {'width': Math.round(e.usedCapacity / e.usableCapacity * 100) + '%'};
						dashboardCtrl.statusSizeMaxStyle = {'width': Math.round(e.maxCapacity / e.usableCapacity * 100) + '%'};
						dashboardCtrl.statusConnectionCurrent = e.totalConnections;
						dashboardCtrl.statusConnectionMax = (e.maxConnections > e.totalConnections) ? e.maxConnections : e.totalConnections;
						dashboardCtrl.statusConnectionStyle = {'width': Math.round(e.totalConnections / e.totalConnections * 100) + '%'};
						dashboardCtrl.statusThroughtputCurrent = 0;
						dashboardCtrl.statusThroughtputMax = 0;
						dashboardCtrl.statusThroughtputStyle = {'width': '0%'};
						ap($scope);
					}
				});
			}

			function getAllStatusList() {
				return dashboardService.getAllStatusList().then(function (e) {
					console.log("dashboard : getAllStatusList :", e);
					if (e) {
						dashboardCtrl.statusServiceList = e.statusServiceList;
						dashboardCtrl.statusVolumeList = e.statusVolumeList;
						dashboardCtrl.statusHostList = e.statusHostList
					}
				});
			}

			function getHighestAlarmStatus() {
				return dashboardService.getHighestAlarmStatus().then(function (e) {
					console.log("dashboard : getHighestAlarmStatus :", e);
					dashboardCtrl.highestAlarmStatus = (e && e.length) ? e : [];
				})
			}

			// draw
			function channgeServiceViewType() {
				if (dashboardCtrl.statusServiceList && dashboardCtrl.statusServiceList.length > 0) {
					switch (dashboardCtrl.viewType) {
						case dashboardCtrl.viewTypeList[0]:
							sortServiceList(sortType[0]);
							break;
						case dashboardCtrl.viewTypeList[1]:
							sortServiceList(sortType[2]);
							break;
						case dashboardCtrl.viewTypeList[2]:
							dashboardCtrl.gridOptions = getGridOption(dashboardCtrl.statusServiceList);
							break;
					}
				}
			}

			function drawService(sort) {
				for (var i = 0; i < dashboardCtrl.statusServiceList.length; ++i) {
					dashboardCtrl.statusServiceList[i].capacityPercent = (!dashboardCtrl.statusServiceList[i].usableCapacity || dashboardCtrl.statusServiceList[i].usableCapacity == 0 ? 0 : (dashboardCtrl.statusServiceList[i].usedCapacity / dashboardCtrl.statusServiceList[i].usableCapacity * 100));
					for (var j = 0; j < dashboardCtrl.highestAlarmStatus.length; ++j) {
						if (dashboardCtrl.highestAlarmStatus[j].type.toUpperCase() == 'SERVICE'
							&& dashboardCtrl.statusServiceList[i].serviceName.toUpperCase() == dashboardCtrl.highestAlarmStatus[j].name.toUpperCase()) {
							var severity = getAlarmName(dashboardCtrl.highestAlarmStatus[j].alarmSeverity);
							dashboardCtrl.statusServiceList[i].alarmSeverity = severity;
							dashboardCtrl.statusServiceList[i].alarmTitle = severity.substring(0, 1).toUpperCase() + severity.substring(1, severity.length);
							break;
						}
					}
				}

				sortServiceList(sort);
			}

			function drawVolume(sort) {
				for (var i = 0; i < dashboardCtrl.statusVolumeList.length; ++i) {
					var gauge = (parseInt(dashboardCtrl.statusVolumeList[i].usableCapacity) == 0) ? 0 :
						Math.ceil(parseInt(dashboardCtrl.statusVolumeList[i].usedCapacity) / parseInt(dashboardCtrl.statusVolumeList[i].usableCapacity) * 7);
					dashboardCtrl.statusVolumeList[i].gauge = gauge < 1 ? 1 : gauge;
					dashboardCtrl.statusVolumeList[i].usedList = new Array(dashboardCtrl.statusVolumeList[i].gauge);
					dashboardCtrl.statusVolumeList[i].unusedList = new Array(7 - dashboardCtrl.statusVolumeList[i].gauge);
					for (var j = 0; j < dashboardCtrl.highestAlarmStatus.length; ++j) {
						if (dashboardCtrl.highestAlarmStatus[j].type.toUpperCase() == 'VOL'
							&& dashboardCtrl.statusVolumeList[i].volumeName.toUpperCase() == dashboardCtrl.highestAlarmStatus[j].name.toUpperCase()) {
							dashboardCtrl.statusVolumeList[i].alarmSeverity = getAlarmName(dashboardCtrl.highestAlarmStatus[j].alarmSeverity);
							break;
						}
					}
				}

				sortVolumeList(sort);
			}

			function drawHost() {
				for (var i = 0; i < dashboardCtrl.statusHostList.length; ++i) {
					for (var j = 0; j < dashboardCtrl.highestAlarmStatus.length; ++j) {
						if (dashboardCtrl.highestAlarmStatus[j].type.toUpperCase() == 'HOST' && dashboardCtrl.statusHostList[i].hostName.toUpperCase() == dashboardCtrl.highestAlarmStatus[j].name.toUpperCase())
							dashboardCtrl.statusHostList[i].alarmSeverity = getAlarmName(dashboardCtrl.highestAlarmStatus[j].alarmSeverity);
					}
				}
			}

			function drawSelectHostDetail() {
				angular.element(".host-list").empty();
				angular.element(".host-content").empty();

				for (var i = 0, il = dashboardCtrl.selectedHostList.length; i < il; ++i) {
					for (var j = 0, jl = dashboardCtrl.statusHostList.length; j < jl; ++j) {
						if (dashboardCtrl.selectedHostList[i].hostName == dashboardCtrl.statusHostList[j].hostName) {
							angular.element(".host-list").append($compile('<ul><li><a class="host-list-item" id="list_' + i + '" href="javascript:;" ng-click="dashboardCtrl.clickHostList(' + i + ')">' + dashboardCtrl.statusHostList[j].hostName + '</a></li></ul>')($scope));
							angular.element(".host-content").append('<div id="content_' + i + '" class="host-content-table">');

							var hostInfo = [];
							hostInfo.push('<table class="mu-formbox">');
							hostInfo.push('	<tbody>');
							hostInfo.push('		<tr>');
							hostInfo.push('			<th>Host name</th>');
							hostInfo.push('			<td><strong class="val">AFNAS-APP</strong></td>');
							hostInfo.push('		</tr>');
							hostInfo.push('		<tr>');
							hostInfo.push('			<th>disk volume</th>');
							hostInfo.push('			<td>');
							hostInfo.push('				<span class="val">' + dashboardCtrl.statusHostList[j].dfFree + 'GB </span> diskpart-root-excepted-used disk<br>');
							hostInfo.push('				<span class="val">' + dashboardCtrl.statusHostList[j].dfUsed + 'GB</span> diskpart-root-used disk<br>');
							hostInfo.push('				<span class="val">' + dashboardCtrl.statusHostList[j].dfTotal + 'GB</span> total disk');
							hostInfo.push('			</td>');
							hostInfo.push('		</tr>');
							hostInfo.push('		<tr>');
							hostInfo.push('			<th>network usage (RX/TX)</th>');
							hostInfo.push('			<td><span class="val">' + dashboardCtrl.statusHostList[j].bytesIn + '/' + dashboardCtrl.statusHostList[j].bytesOut + '(kbyte)</span></td>');
							hostInfo.push('		</tr>');
							hostInfo.push('		<tr>');
							hostInfo.push('			<th>cpu usage</th>');
							hostInfo.push('			<td><span class="val">' + dashboardCtrl.statusHostList[j].cpuUsage + '%</span></td>');
							hostInfo.push('		</tr>');
							hostInfo.push('		<tr>');
							hostInfo.push('			<th>mem usage</th>');
							hostInfo.push('			<td><span class="val">' + dashboardCtrl.statusHostList[j].memUsage + '%</span></td>');
							hostInfo.push('		</tr>');
							hostInfo.push('	</tbody>');
							hostInfo.push('</table>');
							angular.element("#content_" + i).append(hostInfo.join(''));
							//angular.element("#content_" + i).append(dashboardCtrl.statusHostList[j].summary);
							break;
						}
					}
				}

				angular.element("#list_0").addClass("active");
				if (angular.element(".host-content-table").length > 0)
					angular.element(angular.element(".host-content-table")[0]).addClass("active");

				ap($scope);
			}

			function setClickedResource(resource, type, flag) {
				console.log("dashboard : setClickedResource :", resource, type);

				if (!resource) {
					clearClickedResource();
					dashboardCtrl.clickedResourceType = undefined;
					dashboardCtrl.clickedResourceList = [];
				} else if (type && dashboardCtrl.clickedResourceType != type) {
					clearClickedResource();
					dashboardCtrl.clickedResourceType = type;
					dashboardCtrl.clickedResourceList = [resource];
					resource.clicked = true;
				} else if (flag == true) {
					var i, il;
					for (i = 0, il = dashboardCtrl.clickedResourceList.length; i < il; ++i) {
						if (dashboardCtrl.clickedResourceList[i] == resource) {
							dashboardCtrl.clickedResourceList.splice(i, 1);
							resource.clicked = false;
							return;
						}
					}

					dashboardCtrl.clickedResourceList.push(resource);
					resource.clicked = true;
				} else {
					clearClickedResource();
					dashboardCtrl.clickedResourceType = type;
					dashboardCtrl.clickedResourceList = [resource];
					resource.clicked = true;
				}
			}

			function clearClickedResource() {
				var i, il;
				if (dashboardCtrl.clickedResourceList && dashboardCtrl.clickedResourceList.length) {
					for (i = 0, il = dashboardCtrl.clickedResourceList.length; i < il; ++i)
						dashboardCtrl.clickedResourceList[i].clicked = false;
				}
			}

			function initClickedResource() {
				var clicked_resource;
				if (dashboardCtrl.clickedResourceList && dashboardCtrl.clickedResourceList.length) {
					clicked_resource = dashboardCtrl.clickedResourceList;
					dashboardCtrl.clickedResourceList = [];
					var j, jl;
					switch (dashboardCtrl.clickedResourceType) {
						case resourceType[0]:
							while (clicked_resource.length > 0) {
								for (j = 0, jl = dashboardCtrl.statusServiceList.length; j < jl; ++j) {
									if (clicked_resource[0].serviceName == dashboardCtrl.statusServiceList[j].serviceName) {
										clicked_resource.splice(0, 1);
										setClickedResource(dashboardCtrl.statusServiceList[j], resourceType[0], true);
										break;
									}
								}
							}
							break;
						case resourceType[1]:
							while (clicked_resource.length > 0) {
								for (j = 0, jl = dashboardCtrl.statusVolumeList.length; j < jl; ++j) {
									if (clicked_resource[0].volumeName == dashboardCtrl.statusVolumeList[j].volumeName) {
										clicked_resource.splice(0, 1);
										setClickedResource(dashboardCtrl.statusVolumeList[j], resourceType[1], true);
										break;
									}
								}
							}
							break;
						case resourceType[2]:
							while (clicked_resource.length > 0) {
								for (j = 0, jl = dashboardCtrl.statusHostList.length; j < jl; ++j) {
									if (clicked_resource[0].hostName == dashboardCtrl.statusHostList[j].hostName) {
										clicked_resource.splice(0, 1);
										setClickedResource(dashboardCtrl.statusHostList[j], resourceType[2], true);
										break;
									}
								}
							}
							break;
					}

				} else {
					clicked_resource = [dashboardCtrl.statusServiceList[0]];
					setClickedResource(dashboardCtrl.statusServiceList[0], resourceType[0]);
				}
			}

			function setSelectedService(service_list) {
				console.log("dashboard : setSelectedService :", service_list);

				if (invalidServiceList())	return;

				dashboardCtrl.selectedServiceList = angular.copy(service_list);

				var i, j;
				for (i = 0; i < dashboardCtrl.statusServiceList.length; ++i)
					dashboardCtrl.statusServiceList[i].checked = false;

				for (i = 0; i < dashboardCtrl.statusServiceList.length; ++i) {
					for (j = 0; j < dashboardCtrl.selectedServiceList.length; ++j) {
						if (dashboardCtrl.statusServiceList[i].serviceName == dashboardCtrl.selectedServiceList[j].serviceName) {
							dashboardCtrl.statusServiceList[i].checked = true;
						}
					}
				}

				$timeout(function () {
					selectScrolling(".service-box.active", ".service-wrap.mu-scroll-v");
				}, 100);
			}

			function setSelectedVolume(volume_list) {
				console.log("dashboard : setSelectedVolume :", volume_list);

				if (invalidVolumnList())	return;

				dashboardCtrl.selectedVolumeList = angular.copy(volume_list);
				var i, j;
				for (i = 0; i < dashboardCtrl.statusVolumeList.length; ++i)
					dashboardCtrl.statusVolumeList[i].checked = false;

				for (i = 0; i < dashboardCtrl.statusVolumeList.length; ++i) {
					for (j = 0; j < dashboardCtrl.selectedVolumeList.length; ++j) {
						if (dashboardCtrl.statusVolumeList[i].volumeName == dashboardCtrl.selectedVolumeList[j].volumeName)
							dashboardCtrl.statusVolumeList[i].checked = true;
					}
				}

				$timeout(function () {
					selectScrolling(".disk-box.active", ".volume-wrap.mu-scroll-v");
				}, 100);
			}

			function setSelectedHost(host_list) {
				console.log("dashboard : setSelectedHost :", host_list);

				if (!dashboardCtrl.statusHostList)	return;

				dashboardCtrl.selectedHostList = angular.copy(host_list);

				var i, il, j, jl;
				for (i = 0, il = dashboardCtrl.statusHostList.length; i < il; ++i)
					dashboardCtrl.statusHostList[i].checked = false;

				for (i = 0, il = dashboardCtrl.statusHostList.length; i < il; ++i) {
					for (j = 0, jl = host_list.length; j < jl; ++j) {
						if (dashboardCtrl.statusHostList[i].hostName == host_list[j].hostName)
							dashboardCtrl.statusHostList[i].checked = true;
					}
				}
			}

			function setSelectedAlarm(e, data) {
				console.log("dashboard : setSelectedAlarm :", e, data);
				if (data.resource.toUpperCase() == "GLUSTER") {	// alarm type - volume
					var volume_name = data.location;
					var volume = getVolumeByName(volume_name);
					var volume_list = [volume];

					setClickedResource();
					setAlarmFilter(volume_list);
					setSelectedService(getServiceByVolumeList(volume_list));
					setSelectedVolume(volume_list);
					setSelectedHost(getHostByVolumeList(volume_list));

				} else {											// alarm type - host
					var host_name = data.resource;
					var host = getHostByName(host_name);
					var host_list = [host];

					setClickedResource();
					setAlarmFilter(host_list);
					setSelectedService(getServiceByHostList(host_list));
					setSelectedVolume(getVolumeByHostList(host_list));
					setSelectedHost(host_list);
				}

				drawSelectHostDetail();
				ap($scope);
			}

			function setAlarmFilter(filter) {
				dashboardCtrl.alarmFilter = angular.copy(filter);
			}

			// utils
			function invalidServiceList() {
				if (!dashboardCtrl.statusServiceList) {
					console.log("dashboard : service list is null");
					return true;
				}
				if (!dashboardCtrl.statusServiceList.length || dashboardCtrl.statusServiceList.length < 1) {
					console.log("dashboard : service list length is 0");
					return true;
				}
				return false;
			}

			function invalidVolumnList() {
				if (!dashboardCtrl.statusVolumeList) {
					console.log("dashboard : volumn list is null");
					return true;
				}
				if (!dashboardCtrl.statusVolumeList.length || dashboardCtrl.statusVolumeList.length < 1) {
					console.log("dashboard : volumn list length is 0");
					return true;
				}
				return false;
			}

			function setAllCheckServiceList(flag) {
				if (invalidServiceList())    return;

				flag = (flag == false) ? false : true;

				for (var i = 0; i < dashboardCtrl.statusServiceList.length; ++i)
					dashboardCtrl.statusServiceList[i].checked = flag;
			}

			function setAllCheckVolumeList(flag) {
				if (invalidVolumnList())	return;

				flag = (flag == false) ? false : true;

				for (var i = 0; i < dashboardCtrl.statusVolumeList.length; ++i)
					dashboardCtrl.statusVolumeList[i].checked = flag;
			}

			function getServiceByVolume(volumn) {
				var i, il;
				var list = [];
				for (i = 0, il = dashboardCtrl.statusServiceList.length; i < il; ++i) {
					if (volumn.volumeName == dashboardCtrl.statusServiceList[i].volumeName)
						list.push(dashboardCtrl.statusServiceList[i]);
				}
				return list;
			}

			function getServiceByVolumeList(volumn_list) {
				var i, il, j, jl;
				var list = [];
				for (i = 0, il = volumn_list.length; i < il; ++i) {
					for (j = 0, jl = dashboardCtrl.statusServiceList.length; j < jl; ++j) {
						if (volumn_list[i].volumeName == dashboardCtrl.statusServiceList[j].volumeName)
							list.push(dashboardCtrl.statusServiceList[j]);
					}
				}
				return list;
			}

			function getVolumeByServiceList(service_list) {
				var i, il, j, jl;
				var select_service_list = [];
				for (var i = 0, il = service_list.length; i < il; ++i) {
					for (var j = 0, jl = dashboardCtrl.statusServiceList.length; j < jl; ++j) {
						if (service_list[i].serviceName.toUpperCase() == dashboardCtrl.statusServiceList[j].serviceName.toUpperCase()) {
							select_service_list.push(dashboardCtrl.statusServiceList[j]);
							break;
						}
					}
				}

				var list = [];
				for (var i = 0, il = select_service_list.length; i < il; ++i) {
					for (var j = 0, jl = dashboardCtrl.statusVolumeList.length; j < jl; ++j) {
						if (select_service_list[i].volumeName.toUpperCase() == dashboardCtrl.statusVolumeList[j].volumeName.toUpperCase()) {
							list.push(dashboardCtrl.statusVolumeList[j]);
							break;
						}
					}
				}
				return list;
			}

			function getServiceByHost(host) {
				var i, il;
				var selected_service_list = [];
				var selected_volumn_list = getVolumeByHost(host);
				for (i = 0, il = selected_volumn_list.length; i < il; ++i)
					selected_service_list = selected_service_list.concat(getServiceByVolume(selected_volumn_list[i]));

				return selected_service_list;
			}

			function getServiceByHostList(host_list) {
				var i, il;
				var selected_service_list = [];
				for (i = 0, il = host_list.length; i < il; ++i)
					selected_service_list = selected_service_list.concat(getServiceByHost(host_list[[i]]));

				return selected_service_list;
			}

			function getVolumeByHost(host) {
				var i, il;
				var volume_list = [];
				for (i = 0, il = dashboardCtrl.gfInfoVolnhost.length; i < il; ++i) {
					if (host.hostName == dashboardCtrl.gfInfoVolnhost[i].hostName)
						volume_list.push(dashboardCtrl.gfInfoVolnhost[i].volumeName)
				}

				var selected_volumn_list = [];
				for (i = 0, il = volume_list.length; i < il; ++i)
					selected_volumn_list.push(getVolumeByName(volume_list[i]));

				return selected_volumn_list;
			}

			function getVolumeByHostList(host_list) {
				var i, il, j, jl;
				var volume_list = [];
				for (i = 0, il = host_list.length; i < il; ++i) {
					for (j = 0, jl = dashboardCtrl.gfInfoVolnhost.length; j < jl; ++j) {
						if (host_list[i].hostName == dashboardCtrl.gfInfoVolnhost[j].hostName)
							volume_list.push(dashboardCtrl.gfInfoVolnhost[j].volumeName)
					}
				}

				var selected_volumn_list = [];
				for (i = 0, il = volume_list.length; i < il; ++i)
					selected_volumn_list.push(getVolumeByName(volume_list[i]));

				return selected_volumn_list;
			}

			function getHostByVolume(volume) {
				var i, il;
				var host_list = [];
				for (i = 0, il = dashboardCtrl.gfInfoVolnhost.length; i < il; ++i) {
					if (volume.volumeName.toUpperCase() == dashboardCtrl.gfInfoVolnhost[i].volumeName.toUpperCase())
						host_list.push(dashboardCtrl.gfInfoVolnhost[i].hostName)
				}

				var selected_host_list = [];
				for (i = 0, il = host_list.length; i < il; ++i)
					selected_host_list.push(getHostByName(host_list[i]));

				return selected_host_list;
			}

			function getHostByVolumeList(volume_list) {
				var i, il;
				var list = [];
				for (i = 0, il = volume_list.length; i < il; ++i)
					list = list.concat(getHostByVolume(volume_list[i]));

				var host_list = [];
				for (i = 0, il = list.length; i < il; ++i) {
					if (host_list.indexOf(list[i]) < 0)
						host_list.push(list[i]);
				}

				return host_list;
			}

			function getVolumeByName(name) {
				for (var i = 0, il = dashboardCtrl.statusVolumeList.length; i < il; ++i) {
					if (name.toUpperCase() == dashboardCtrl.statusVolumeList[i].volumeName.toUpperCase())
						return dashboardCtrl.statusVolumeList[i];
				}
			}

			function getHostByName(name) {
				for (var i = 0, il = dashboardCtrl.statusHostList.length; i < il; ++i) {
					if (name.toUpperCase() == dashboardCtrl.statusHostList[i].hostName.toUpperCase())
						return dashboardCtrl.statusHostList[i];
				}
			}

			function sortServiceList(sort) {
				dashboardCtrl.statusServiceList.sort(function (a, b) {
					switch (sort) {
						case sortType[0]:
							if (getAlarmLevel(a[sort]) > getAlarmLevel(b[sort]))
								return -1;
							if (getAlarmLevel(a[sort]) < getAlarmLevel(b[sort]))
								return 1;
							else {
								if (a['serviceName'] > b['serviceName'])
									return 1;
								if (a['serviceName'] < b['serviceName'])
									return -1;
								else
									return 0;
							}
							break;
						default:
							if (a[sort] > b[sort])
								return -1;
							if (a[sort] < b[sort])
								return 1;
							else {
								if (a['serviceName'] > b['serviceName'])
									return 1;
								if (a['serviceName'] < b['serviceName'])
									return -1;
								else
									return 0;
							}
							break;
					}
				});
			}

			function sortVolumeList(sort) {
				dashboardCtrl.statusVolumeList.sort(function (a, b) {
					return getAlarmLevel(a[sort]) > getAlarmLevel(b[sort]) ? -1 : getAlarmLevel(a[sort]) < getAlarmLevel(b[sort]) ? 1 : 0;
				});
			}

			function getAlarmLevel(value) {
				if (!value)
					return 0;

				for (var i = dashboardCtrl.alarmSeverityList.length - 1; i > 0; --i) {
					if (value == dashboardCtrl.alarmSeverityList[i])
						return i;
				}
				return 0;
			}

			function getAlarmName(severity) {
				switch (severity.toUpperCase()) {
					case "CR":
						return dashboardCtrl.alarmSeverityList[3];
					case "MJ":
						return dashboardCtrl.alarmSeverityList[2];
					case "MI":
						return dashboardCtrl.alarmSeverityList[1];
					default:
						return dashboardCtrl.alarmSeverityList[0];
				}
			}

			function getGridOption(data) {
				return {
					enableColumnMenus: false,
					enableRowHeaderSelection: false,
					enableRowSelection: false,
					enableFullRowSelection: false,
					multiSelect: false,
					enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
					excessRows: 5,
					modifierKeysToMultiSelect: false,
					noUnselect: true,
					onRegisterApi: function (gridApi) {
						dashboardCtrl.gridApi = gridApi;
					},
					appScopeProvider: {
						onRowClick: function ($event, row) {
							console.log("dashboard : grid : onRowClick :", row);

							var selected_service = row.entity;
							if (angular.equals(dashboardCtrl.selectedServiceList, [selected_service])) {
								setClickedResource();
								setAlarmFilter();
								setSelectedService([]);
								setSelectedVolume([]);
								setSelectedHost([]);
							} else if ($event.ctrlKey) {
								setClickedResource(selected_service, resourceType[0], true);

								var service_list = dashboardCtrl.clickedResourceList;
								setAlarmFilter(service_list);
								setSelectedService(service_list);
								setSelectedVolume(getVolumeByServiceList(service_list));
								setSelectedHost(getHostByVolumeList(getVolumeByServiceList(service_list)));
							} else {
								setClickedResource(selected_service, resourceType[0]);

								var service_list = dashboardCtrl.clickedResourceList;
								setAlarmFilter(service_list);
								setSelectedService(service_list);
								setSelectedVolume(getVolumeByServiceList(service_list));
								setSelectedHost(getHostByVolumeList(getVolumeByServiceList(service_list)));
							}

							drawSelectHostDetail();
							ap($scope);
						}
					},
					data: data,
					columnDefs: [
						{name: 'serviceName', enableColumnMenu: false, cellTooltip: true, headerTooltip: true},
						{name: 'serviceType', enableColumnMenu: false, cellTooltip: true, headerTooltip: true},
						{name: 'volumeName', enableColumnMenu: false, cellTooltip: true, headerTooltip: true},
						{name: 'volumeType', enableColumnMenu: false, cellTooltip: true, headerTooltip: true}
					],
					rowTemplate: "<div ng-click=\"grid.appScope.onRowClick($event, row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{'ui-grid-selected' : row.entity.checked }\" ui-grid-cell></div>"
				};
			}

			function showPopup(type, data) {
				$scope.detailInfo = data;
				$scope.detailInfo.dataType = type;

				var addPopup = ngDialog.open({
					template: "/dashboard/dashboard_detail_popup.html",
					showClose: false,
					disableAnimation: true,
					cache: false,
					closeByDocument: false,
					closeByEscape: false,
					scope: $scope
				});
			}

			function setSpliiter(spliiter, source, target, topMinHeight, bottomMinHeight) {
				angular.element(spliiter).draggable({
					containment: "parent",
					stop: function (event, ui) {
						var t = angular.element(source);
						var b = angular.element(target);
						var s = angular.element(event.target);
						var p = s.parent();

						t.outerHeight(s.position().top);
						if (t.outerHeight() < topMinHeight)
							t.outerHeight(topMinHeight);

						b.outerHeight(p.outerHeight() - t.outerHeight() - s.outerHeight());
						if (b.outerHeight() < bottomMinHeight) {
							b.outerHeight(bottomMinHeight);
							t.outerHeight(p.outerHeight() - b.outerHeight() - s.outerHeight())
						}

						s.css("top", "auto");
					}
				});
			}

			function selectScrolling(className, scrollRect, margin, complete) {
				margin = margin ? margin : 20;

				var e = angular.element(className);
				if (e.length == 0)
					return;

				var s = angular.element(scrollRect);
				if (s.length == 0)
					return;

				var y = angular.element(e[0]).position().top - angular.element(s[0]).position().top + angular.element(s[0]).scrollTop() - margin;
				if (y < 0) y = 0;

				angular.element(s[0]).animate({
					scrollTop: y
				}, 100, function () {
					if (complete)
						$timeout(complete, 100);
				});
			}

			function removeNodeDetailScrollSyncToNodeList() {
				angular.element(".host-content.mu-scroll-v").unbind('scroll');
			}

			function setNodeDetailScrollSyncToNodeList() {
				angular.element(".host-content.mu-scroll-v").scroll(function (e) {
					var scroll = angular.element(e.target);
					var st = scroll.scrollTop();
					var bh = scroll.position().top;
					var page = 0;

					var l = angular.element(".host-content-table");
					if (st > 10) {
						for (var i = 0; i < l.length; i++) {
							var p = angular.element(l[i]);
							var pt = p.position().top;
							var pb = pt + p.outerHeight();

							console.debug(st, bh, pt, pb, st + bh);
							if (pb < st || pt > st + bh)
								continue;
							else
								page = i;
						}
					}

					console.debug("SCROLL-CURRENT:", page);
					var current = angular.element(l[page]);

					if (l.length == 0)
						return;

					angular.element(".host-content-table").removeClass("active");
					current.addClass("active");

					var hl = angular.element(".host-list-item");
					if (hl.length == 0)
						return;

					hl.removeClass("active");
					angular.element(hl[page]).addClass("active");
				});
			}

			initialize();
		}]);

	app.controller("ServiceDetailCtrl", ["$rootScope", "$scope", "dashboardService", function ($rootScope, $scope, dashboardService) {
		"use strict";

		// property
		var self = this;
		self.style;
		self.dataType;
		self.name;
		self.type;
		self.alarmSeverity;
		self.smbConfig;
		self.gfsConfig;
		self.usedList;
		self.unusedList;
		self.volumeType;
		self.brickcount;
		self.usedCapacity;
		self.usableCapacity;


		// method


		// event-handler
		$scope.$watch('detailInfo', function (value) {
			clearData();

			if (angular.element(".mu-dialog").css("display") != "none") {
				if (value) {
					self.dataType = value.dataType;
					self.title = value.dataType.substring(0, 1).toUpperCase() + value.dataType.substring(1);
					self.alarmSeverity = value.alarmSeverity;
					if (self.dataType == "service") {
						self.name = value.serviceName;
						self.type = value.serviceType;
						dashboardService.getSelectServiceDetail({
							serviceId: value.serviceId,
							serviceType: value.serviceType
						}).then(function (data) {
							console.log("dashboard : popup : getSelectServiceDetail :", data);
							if (data && data.length) {
								self.smbConfig = data[0].smbConfig;
								self.gfsConfig = data[0].gfsConfig;
								ap($scope);
							}
						});
					} else if (self.dataType == "volume") {
						self.name = value.volumeName;
						self.type = value.volumeType;
						self.unusedList = value.unusedList;
						self.usedList = value.usedList;
						self.volumeType = value.volumeType;
						self.brickcount = value.brickcount;
						self.usedCapacity = value.usedCapacity;
						self.usableCapacity = value.usableCapacity;
						dashboardService.getSelectServiceDetail({serviceId: value.serviceId}).then(function (data) {
							console.log("dashboard : popup : getSelectServiceDetail :", data);
							if (data && data.length) {
								self.gfsConfig = data[0].gfsConfig;
								ap($scope);
							}
						});
					}
				} else {
					clearData();
				}
			}
		});

		// function
		function initialize() {
			clearData();
		}

		function clearData() {
			self.dataType = "";
			self.name = "";
			self.type = "";
			self.alarmSeverity = "";
			self.smbConfig = "";
			self.gfsConfig = "";
			self.usedList = [];
			self.unusedList = new Array(7);
			self.volumeType = "";
			self.brickcount = 0;
			self.usedCapacity = 0;
			self.usableCapacity = 0;
		}

		initialize();
	}]);
});