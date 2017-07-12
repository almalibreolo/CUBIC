define(["app", "moment"], function(app, moment) {
	app.controller("SystemCtrl", ["$scope", "ConfigManager", "systemService", "uiGridConstants", function($scope, ConfigManager, systemService, uiGridConstants) {
		"use strict";

		// property
		var systemCtrl = this;

		systemCtrl.afnasSmCollectTime = [];
		systemCtrl.afnasSmProcess = [];
		systemCtrl.afnasSmProcessTopicInfo = [];
		systemCtrl.afnasSmServer = [];
		systemCtrl.afnasSmServerCheckInfo = [];

		systemCtrl.gridOptionsCollectTime = getGridOption([], []);
		systemCtrl.gridOptionsProcess = getGridOption([], []);
		systemCtrl.gridOptionsProcessTopicInfo = getGridOption([], []);
		systemCtrl.gridOptionsServer = getGridOption([], []);
		systemCtrl.gridOptionsServerCheckInfo = getGridOption([], []);

		systemCtrl.refreshType = 0;
		systemCtrl.lastUpdateTime = null;
		var interval = null;
		
		
		// method
		
		// polling
		systemCtrl.setPolling = function () {
			if (systemCtrl.refreshType == 0) {
				if (interval) {
					clearInterval(interval);
				}
				interval = setInterval(getAllData, parseInt(ConfigManager.getConst("REFRESH-INTERVAL")));
				systemCtrl.refreshType = 1;
			} else {
				clearInterval(interval);
				interval = null;
				systemCtrl.refreshType = 0;
			}
		};

		systemCtrl.isPolling = function () {
			if (systemCtrl.refreshType == 0) {
				return false;
			}
			
			return true;
		};
		
		systemCtrl.refresh = function() {
			systemCtrl.refreshType = 0;
			getAllData();
			systemCtrl.setPolling();
		}

		// event-handler


		// function
		function initialize() {
			initializeEventHandler();

			getAllData();
			systemCtrl.setPolling();
		}
		
		function initializeEventHandler() {
			$scope.$on("$destroy", function() {
				if (interval) {
					clearInterval(interval);
				}				
			});
		}

		function getAllData() {
			Promise.all([
				systemService.getAfnasSmCollectTime(),
				systemService.getAfnasSmProcess(),
				systemService.getAfnasSmProcessTopicInfo(),
				systemService.getAfnasSmServer(),
				systemService.getAfnasSmServerCheckInfo()
			]).then(function (values) {
				systemCtrl.afnasSmCollectTime = values[0];
				var column_ct = ['CLUSTER_NAME','HOST_NAME','COLLECT_TYPE','UPDATE_TIME'];
				var column_d_ct = ['Cluster Name','Node Name','Collect Type','Update Time'];
				systemCtrl.gridOptionsCollectTime = getGridOption(makeColumn(column_ct, column_d_ct), systemCtrl.afnasSmCollectTime);
				
				systemCtrl.afnasSmProcess = values[1];
				var column_p = ['HOSTNAME','PROCESS_NAME','PROCESS_GROUP_NAME','PROCESS_CHECK_KEY','STATUS','UPDATE_DATE'];
				var column_d_p = ['Host Name','Process Name','Process Group Name','Process Check Key','Status','Update Date'];
				systemCtrl.gridOptionsProcess = getGridOption(makeColumn(column_p, column_d_p), systemCtrl.afnasSmProcess);
				
				systemCtrl.afnasSmProcessTopicInfo = values[2];
				var column_pti = ['CLUSTER','BROKER_LISTS','TYPE','TOPIC','OFFSET','UPDATE_DATE'];
				var column_d_pti = ['Cluster','Broker Lists','Type','Topic','Offset','Update Date'];
				systemCtrl.gridOptionsProcessTopicInfo = getGridOption(makeColumn(column_pti, column_d_pti), systemCtrl.afnasSmProcessTopicInfo);
				
				systemCtrl.afnasSmServer = values[3];
				var column_s = ['HOSTNAME','IPADDRESS','LOGIN_ID','LOGIN_PASSWORD','KEY_LOCATION','STATUS','UPDATE_DATE'];
				var column_d_s = ['Host Name','IP Address','Login ID','Login Password','Key Location','Status','Update Date'];
				systemCtrl.gridOptionsServer = getGridOption(makeColumn(column_s, column_d_s), systemCtrl.afnasSmServer);
				
				systemCtrl.afnasSmServerCheckInfo = values[4];
				var column_sci = ['HOSTNAME','CHECK_TYPE','CHECK_INTERVAL'];
				var column_d_sci = ['Host Name','Check Type','Check Interval'];
				systemCtrl.gridOptionsServerCheckInfo = getGridOption(makeColumn(column_sci, column_d_sci), systemCtrl.afnasSmServerCheckInfo);
			
				systemCtrl.lastUpdateTime = moment(new Date()).local().format("YYYY-MM-DD HH:mm:ss");
			
			}, function(reason) {
				  console.log("system :", reason);
			});
		}

		function makeColumn(list, list2) {
			var column_list = [];
			for(var i=0; i<list.length; ++i) {
				column_list.push({ name: list[i], enableColumnMenu: false, cellTooltip: true, headerTooltip: true, displayName: list2[i] })
			}
			return column_list;
		}

		function getGridOption(column, data) {
			return {
				enableColumnMenus:false,
				enableRowHeaderSelection: false,
				enableRowSelection: false,
				enableFullRowSelection: false,
				multiSelect:false,
				enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
				// excessRows: 100,
				// enableSorting: false,
				modifierKeysToMultiSelect: false,
				noUnselect: true,
				onRegisterApi: function(gridApi) {
					systemCtrl.gridApi = gridApi;
				},
				data: data,
				columnDefs: column
				// rowTemplate: "<div ng-click=\"grid.appScope.onRowClick(row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell dbl-click-row></div>"
			};
		}
		
		initialize();
	}]);
});