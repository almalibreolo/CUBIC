define(["app", "moment"], function(app, moment) {

	function severityFilter(list, target) {
		var r = [];
		for (var i=0, l=list.length; i < l; i++) {
			var v = list[i];
			var s = v["severity"];
			if (target[s]) {
				r.push(v);
			}
		}
		return r;
	}

	function alarmFilter(list, target) {
		// if(!target)
		// 	return list;

		var name = "cellStyle";

		if(!target) {
			for (var i=0, l=list.length; i < l; i++) {
				list[i][name] = {opacity: 1};
			}
		} else {
			// var r = [];
			for (var i=0, l=list.length; i < l; i++) {
				var v = list[i];
				var s = v["severity"];
				if (target["serviceName"]) {
					if(target["serviceName"].toUpperCase() == v["location"]) {
						// r.push(v);
						v[name] = {opacity: 1};
					} else {
						v[name] = {opacity: 0.5};
					}
				} else if(target["hostName"]) {
					if(target["hostName"].toUpperCase() == v["resource"]) {
						// r.push(v);
						v[name] = {opacity: 1};
					} else {
						v[name] = {opacity: 0.5};
					}
				}
			}
		}
		// return r;
		return list;
	}

	function selectedFilter(list, target) {
		var name = "selected";

		if(!target || (target["alarmSeverity"] == "normal")) {
			for (var i=0, l=list.length; i < l; i++) {
				list[i][name] = false;
			}
		} else {
			for (var i=0, l=list.length; i < l; i++) {
				var v = list[i];
				var s = v["severity"];
				if (target["serviceName"]) {
					if(v["location"].toUpperCase().indexOf("SMB") > -1 && target["serviceType"] != "NATIVE") {
						v[name] = true;
					} else if(target["volumeName"].toUpperCase() == v["location"]) {
						v[name] = true;
					} else {
						v[name] = false;
					}
				} else if(target["hostName"]) {
					if(target["hostName"].toUpperCase() == v["resource"]) {
						// r.push(v);
						v[name] = true;
					} else {
						v[name] = false;
					}
				}
			}
		}

		return list;
	}

	function selectedFilters(list, targets) {
		var name = "selected";
		var i, il, j, jl;
		for (i=0, il=list.length; i < il; i++) {
			list[i][name] = false;
		}
		if(!targets || !targets.length) {
			/*for (i=0, il=list.length; i < il; i++) {
				list[i][name] = false;
			}*/
		} else {
			for(j=0, jl=targets.length; j<jl; ++j) {
				if (targets[j]["alarmSeverity"] == "normal") {
					/*for (var i = 0, il = list.length; i < il; i++) {
						list[i][name] = false;
					}*/
				} else {
					for (i = 0, il = list.length; i < il; i++) {
						var v = list[i];
						var s = v["severity"];
						if (targets[j]["serviceName"]) {
							if (v["location"].toUpperCase().indexOf("SMB") > -1 && targets[j]["serviceType"] != "NATIVE") {
								v[name] = true;
							} else if (targets[j]["volumeName"].toUpperCase() == v["location"]) {
								v[name] = true;
							} /*else {
								v[name] = false;
							}*/
						} else if (targets[j]["hostName"]) {
							if (targets[j]["hostName"].toUpperCase() == v["resource"]) {
								// r.push(v);
								v[name] = true;
							} /*else {
								v[name] = false;
							}*/
						}
					}
				}
			}
		}

		return list;
	}

	function clickedFilter(list, target) {
		var name = 'clicked';
		for (var i=0, l=list.length; i < l; i++) {
			list[i][name] = false;
		}
		if(target)
			target[name] = true;
	}


    app.directive("currentAlarm", ["$rootScope", "AlarmManager", "ConfigManager", "uiGridConstants",
    	function($rootScope, AlarmManager, ConfigManager, uiGridConstants) {
	        'use strict';

	        return {
	            restrict: "E",
	            transclude: true,
	            template: '<div ui-grid="gridOptions" ui-grid-selection ui-grid-exporter class="grid" ui-grid-auto-resize style="height:calc(100% - 35px); width:100%" ></div>',
	            scope: {
					selectedFilter: "=",
					clickedFilter: "="
	            },
	            link: function postLink($scope, element, attrs, controller) {
	                // property
	            	var target = angular.element(element);

					$scope.$watch("selectedFilter", function (value, valueOld) {
						if (angular.equals(value, valueOld)) return;

						$scope.filterdAlarmList = selectedFilters($scope.alarmList, value);
						$scope.gridOptions.data = $scope.filterdAlarmList;
						ap($scope);
					});

					$scope.$watch("clickedFilter", function (value, valueOld) {
						if (angular.equals(value, valueOld)) return;

						if(value == false)
							clickedFilter($scope.alarmList);
					});
	            	
	            	// function
	            	function remove() {
	            		target.off("remove", remove);
	            	}
	            	target.on("remove", remove);
	            },
	            controller: ["$scope", function($scope) {
	                // property
	            	$scope.alarmList = [];
	            	$scope.filterdAlarmList = [];
	            	$scope.severity = {
	                    "CR": true,
	                    "MJ": true,
	                    "MI": true
	            	};

					$scope.gridOptions = getGridOption();
					$scope.gridOptions.columnDefs = [{
							name : 'Severity',
							field : 'severity',
							enableColumnMenu: false,
							cellTooltip:true,
							headerTooltip:true,
							minWidth : 72,
							width : 72,
							cellTemplate : '<div class="ui-grid-cell-contents"><span class="{{grid.appScope.getSeverityClass(row)}}"></span></div>',
							sortingAlgorithm: function (a, b) {
								if(getSeverityLevel(a) > getSeverityLevel(b))
									return 1;
								if(getSeverityLevel(a) < getSeverityLevel(b))
									return -1;
								else
									return 0;

							}
						}, {
							name : 'Occured Time',
							field : 'occurTime',
							enableColumnMenu: false,
							cellTooltip:true,
							headerTooltip:true,
							minWidth : 150,
							width : 150,
							cellTemplate : '<div class="ui-grid-cell-contents" title="{{grid.appScope.getTimeFormat(row.occurTime)}}">{{grid.appScope.getTimeFormat(row.occurTime)}}</div>',
							//TODO default sort 추가
							sort: {
								direction: 'desc',
								priority: 1
								}
						}, {
							name : 'Alarm Name',
							field : 'alarmName',
							enableColumnMenu: false,
							cellTooltip:true,
							headerTooltip:true
						}, {
							name : 'Resource',
							field : 'resource',
							enableColumnMenu: false,
							cellTooltip:true,
							headerTooltip:true
						}, {
							name : 'Location',
							field : 'location',
							enableColumnMenu: false,
							cellTooltip:true,
							headerTooltip:true
						}, {
							name : 'Messages',
							field : 'occurMessage',
							enableColumnMenu: false,
							cellTooltip:true,
							headerTooltip:true
						}, {
							name : '',
							field : 'button',
							enableColumnMenu: false,
							cellTooltip:true,
							headerTooltip:true,
							cellTemplate: '<button type="button" class="mu-btn mu-btn-icon mu-btn-bg-non" ng-click="grid.appScope.onBtnClick1(row)" title="acknowledge"><i ng-class="grid.appScope.getAcknowledgeClass(row)"></i></button>' +
							'<button type="button" class="mu-btn mu-btn-icon mu-btn-bg-non" ng-click="grid.appScope.onBtnClick2(row)" title="delete"><i class="mu-icon trash"></i></button>' +
							'<button type="button" class="mu-btn mu-btn-icon mu-btn-bg-non" ng-click="grid.appScope.onBtnClick3(row)" title="go to Alarms"><i class="mu-icon share"></i></button>'
						}];
					$scope.gridOptions.data = [];



	            	// method
	            	$scope.getAlarmSeverityClass = function(alarm) {
	            		var severity = alarm.severity;
	            		if (severity.toUpperCase() == "CR") {
	            			// return "alarm-list critical";
							return "stat critical";
	            		}
	            		
	            		if (severity.toUpperCase() == "MJ") {
	            			// return "alarm-list major";
							return "stat major";
	            		}
	            		
	            		if (severity.toUpperCase() == "MI") {
	            			// return "alarm-list minor";
							return "stat minor";
	            		}
	            		
	            		return "";	
	            	};
	            	
	            	$scope.getTimeFormat = function(time) {
	            		return moment(time).local().format("YYYY-MM-DD HH:mm:ss");
	            	};
	            	
	            	$scope.getAlarmFilterClass = function(value, severity) {
	            		var v = $scope.severity[severity];
	            		var cv = "";
	            		if (v) {
	            			cv = "active";
	            		}
	            		
	            		return value + " " + cv;
	            	};
	            	
	            	$scope.alarmFilterBySeverity = function(value) {
	            		$scope.severity[value] = !$scope.severity[value];
	                  	$scope.filterdAlarmList = severityFilter($scope.alarmList, $scope.severity);
	            		ap($scope);
	            	};
	            	
	            	$scope.getAcknowledgeClass = function(alarm) {
	            		if (alarm.ackTime == "0") {
	            			return "mu-icon check";
	            		}
	            		
	            		return "fa fa-eye fa-1";
	            	};
	            	
	            	$scope.acknowledge = function(alarm) {
	            		if (alarm.ackTime != "0") {
	            			return;
	            		}
	            		
	            		AlarmManager.acknowledge([parseInt(alarm.alarmSeq)], "admin", "");
	            	};
	            	
	            	$scope.clear = function(alarm) {
						var deleteConfirm = confirm("Are you sure you want to DELETE?");
						if(!deleteConfirm) return;

	            		AlarmManager.clear([parseInt(alarm.alarmSeq)], "admin", "");
	            	};
	            	
	            	$scope.gotoAlarm = function(alarm) {
	            		alert("준비 중 입니다.");
	            	};
	            	
	            	// event-handler
	            	
	            	
	            	// function
	            	function initAlarmList(data) {
            			$scope.alarmList = data;	       	            			
            			// $scope.filterdAlarmList = severityFilter($scope.alarmList, $scope.severity);
						$scope.filterdAlarmList = selectedFilters($scope.alarmList, $scope.selectedFilter);
						$scope.gridOptions.data = $scope.filterdAlarmList;
            			ap($scope);
	            	}

	            	function getAlarmList() {
	            		AlarmManager.getAlarmList(1, 100).then(function(e) {
	            			if (!e) {
	            				$scope.alarmList = null;
	            				return;
	            			}
	            			initAlarmList(e.datas);
	            		});
	            	}

					function getGridOption() {
						return {
							data : 'alarmAnalysisCtrl.data.alarmList',
							enableColumnMenus:false,
							enableRowSelection: false,
							enableFullRowSelection:false,
							enableRowHeaderSelection: false,
							multiSelect:false,
							enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
							enableExpandable: true,
							excessRows:100,
							enableExpandableRowHeader: false,
							enableSorting: true,
							appScopeProvider: {
								getSeverityClass: function(row) {
									return getGridSeverityClass(row);
								},
								getTimeFormat: function(time) {
									return $scope.getTimeFormat(time);
								},
								getAcknowledgeClass: function(row) {
									return $scope.getAcknowledgeClass(row.entity);
								},
								onRowClick: function($event, row) {
									if (!row || !row.entity)
										return;

									clickedFilter($scope.alarmList, row.entity);

									$rootScope.$broadcast(ConfigManager.getEvent("SELECTED_ALARM"), $event, row.entity);
									// $scope.$parent.dashboardCtrl.onSelectedAlarm($event, row.entity);
								},
								onBtnClick1:function (row) {
									$scope.acknowledge(row.entity);
								},
								onBtnClick2:function (row) {
									$scope.clear(row.entity);
								},
								onBtnClick3:function (row) {
									$scope.gotoAlarm(row.entity);
								}
							},
							onRegisterApi: function (gridApi) {
								$scope.gridApi = gridApi;
							},
							rowTemplate: "<div ng-click=\"grid.appScope.onRowClick($event, row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{'ui-grid-selected' : row.entity.selected, 'ui-grid-focus' : row.entity.clicked }\" ui-grid-cell></div>"
						};
					}

					function getGridSeverityClass(row) {
						if(row.entity) {
							return $scope.getAlarmSeverityClass(row.entity);

						}
					}

					function getSeverityLevel(value) {
	            		switch (value) {
							case "CR":
								return 0;
							case "MJ":
								return 1;
							case "MI":
								return 2;
							default:
								return 3;
						}

					}
	            	
	        		function initializeEventHandler() {
	        			$rootScope.$on(ConfigManager.getEvent("OCCURED_ALARM"), function(e, data) {
	        				initAlarmList(data.alarmList);
	        			});
	        		}
	        		
	            	function initialize() {
	            		initializeEventHandler();
	            		getAlarmList();
	            	}
	        		
	        		initialize();
	            }] 
	        }
    	}]);
});