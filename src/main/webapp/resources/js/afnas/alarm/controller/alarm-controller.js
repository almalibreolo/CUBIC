define(["app", "moment"], function(app, moment) {
	app.controller("AlarmCtrl", ["$scope","$interval", "$filter", "$q", "$timeout", "alarmService", "uiGridConstants", "ConfigManager", function($scope, $interval, $filter, $q, $timeout, alarmService, uiGridConstants, ConfigManager) {
		"use strict";

		// property
		var alarmCtrl = this;
		var isReceived = false;
		var isRefresh = true;
		
	    var POLLING_INTERVAL =ConfigManager.getConst("TIME").POLLING_INTERVAL;
	    var TIME_FORMAT = ConfigManager.getConst("TIME").FORMAT;
	    var pollingTimer = undefined;

		alarmCtrl.severityFullList = ["critical", "major", "minor"];
		// alarmCtrl.searchDetailTypeList = [{"label": "Message", "value": "message"}, {"label": "Service Name", "value": "serviceName"}, {"label": "Volume Name", "value": "volumeName"}, {"label": "Node Name", "value": "hostName"}, {"label": "Alarm Code", "value": "alarmCode"}, {"label": "Alarm Name", "value": "alarmName"}/*, {"label": "Tag", "value": "tag"}*/];
		alarmCtrl.searchDetailTypeList = [{"label": "Message", "value": "message"}, {"label": "Resource", "value": "resource"}, {"label": "Location", "value": "location"}, {"label": "Alarm Code", "value": "alarmCode"}, {"label": "Alarm Name", "value": "alarmName"}];
		alarmCtrl.pagePerCountList = ConfigManager.getConst("PAGE_PER_COUNT");

		alarmCtrl.data = {count:0, cr:0, mj:0, mi:0, list:[]};
		alarmCtrl.count = {count:0, cr:0, mj:0, mi:0};

		alarmCtrl.eventConfigList = [];
		alarmCtrl.eventNameList = [];
		alarmCtrl.eventConfigFilterList = [];

		alarmCtrl.statusServiceList = [];
		alarmCtrl.statusVolumeList = [];
		alarmCtrl.statusHostList = [];


		// filter
		// alarmCtrl.size = 1000;
		// alarmCtrl.offset = 0;
		alarmCtrl.pageIndex = 1;
		alarmCtrl.pageCount = 20;

		alarmCtrl.edate = moment();
		alarmCtrl.sdate = moment(alarmCtrl.edate).subtract(ConfigManager.getConst("TIME").TIME_RANGES_DEFAULT, 'seconds');
		alarmCtrl.currentTimeRange=ConfigManager.getConst("TIME").TIME_RANGES[0];
		alarmCtrl.isPlay=true;

		alarmCtrl.orderType = alarmService.orderTypeDec;
		alarmCtrl.orderBy = alarmService.orderByOccurDate;

		alarmCtrl.severityList = [alarmService.severityCritical, alarmService.severityMajor, alarmService.severityMinor];
		alarmCtrl.service = true;
		alarmCtrl.serviceName = null;
		alarmCtrl.volume = true;
		alarmCtrl.volumeName = null;
		alarmCtrl.host = true;
		alarmCtrl.hostName = null;
		alarmCtrl.resource = null;
		alarmCtrl.location = null;
		alarmCtrl.message = null;
		alarmCtrl.alarmCode = null;
		alarmCtrl.alarmName = null;
		alarmCtrl.alarmCodeList = [];
		alarmCtrl.status = null;
		alarmCtrl.tag = null;
		alarmCtrl.searchText = null;


		// grid
		alarmCtrl.listGridOptions = {};
		alarmCtrl.defineGridOptions = {};

		alarmCtrl.searchDefineText = "";
		alarmCtrl.selectedDefineGridRow = null;


		// resolved time
		alarmCtrl.aggregationFuncs = ConfigManager.getConst("ALARM").AGGREGATION_FUNCS;
		alarmCtrl.aggregationFunc = alarmCtrl.aggregationFuncs[0].value;
		alarmCtrl.resolvedTime='';


		// mode
		alarmCtrl.alarmEditMode = false;
		alarmCtrl.searchDetailMode = false;


		// 상세검색 창 컨트롤
		alarmCtrl.isSearchDetailResource = false;
		alarmCtrl.isSearchDetailLocation = false;
		alarmCtrl.isSearchDetailAlarmCode = false;
		alarmCtrl.isSearchDetailAlarmName = false;

		alarmCtrl.searchDetailParamList = [{ type:'message', value:'', selectList: alarmCtrl.searchDetailTypeList }];

		// style
		alarmCtrl.positionTop = "100px";
	    alarmCtrl.positionRight = "225px";



	    // method
		alarmCtrl.clickSeverity = function (type) {
			console.log("alarm : clickSeverity :", type);
			switch(type) {
				case alarmCtrl.severityFullList[0]:
					if($('#btnCritical').hasClass('selected')) {
						$('#btnCritical').removeClass('selected');
					} else {
						$('#btnCritical').addClass('selected');
					}
					break;
				case alarmCtrl.severityFullList[1]:
					if($('#btnMajor').hasClass('selected')) {
						$('#btnMajor').removeClass('selected');
					} else {
						$('#btnMajor').addClass('selected');
					}
					break;
				case alarmCtrl.severityFullList[2]:
					if($('#btnMinor').hasClass('selected')) {
						$('#btnMinor').removeClass('selected');
					} else {
						$('#btnMinor').addClass('selected');
					}
					break;
			}

			var list = [];
			if($('#btnCritical').hasClass('selected'))
				list.push('CR');
			if($('#btnMajor').hasClass('selected'))
				list.push('MJ');
			if($('#btnMinor').hasClass('selected'))
				list.push('MI');

			alarmCtrl.severityList = list;
			
			stopPollingHistory();

			getAlarmList();
			getResolvedTime();
		};

		alarmCtrl.clickResource = function (type) {
			console.log("alarm : clickResource :", type);

			switch (type) {
				case "service":
					alarmCtrl.service = !alarmCtrl.service;
					break;
				case "volume":
					alarmCtrl.volume = !alarmCtrl.volume;
					break;
				case "host":
					alarmCtrl.host = !alarmCtrl.host;
					break;
			}

			stopPollingHistory();
			getAlarmList();
			getResolvedTime();
		};


		// grid
		alarmCtrl.sortChanged = function (grid, sortColumns) {
			if(!sortColumns ||  (sortColumns.length > 0 && !sortColumns[0])) {
				return;
			}

			if(sortColumns.length === 0) {
				alarmCtrl.orderType = "";
				alarmCtrl.orderBy = "";
			} else {
				alarmCtrl.orderBy = camelToUnderscore(sortColumns[0].field);

				switch( sortColumns[0].sort.direction ) {
					case uiGridConstants.ASC:
						alarmCtrl.orderType = alarmService.orderTypeAsc;
						break;
					case uiGridConstants.DESC:
						alarmCtrl.orderType = alarmService.orderTypeDec;
						break;
					case undefined:
						alarmCtrl.orderType = "";
						alarmCtrl.orderBy = "";
						break;
				}
			}
			stopPollingHistory();
			getAlarmList();
	
		};

		alarmCtrl.onChangePageIndex = function() {
		    stopPollingHistory();
			getAlarmList();
		};

		alarmCtrl.onPageDataChange = function(e, value) {
			alarmCtrl.pageCount = value.value;
			alarmCtrl.pageIndex = 1;
			stopPollingHistory();
			getAlarmList();
		};
		
		alarmCtrl.onChangeAggregationFunc = function(e) {

			alarmCtrl.aggregationFunc=e.value;
			getResolvedTime();
		};

	     alarmCtrl.timeRangeChange = function(start, end, timeRange) {
	            
	            var startTime = moment(start);
	            var endTime = moment(end);
	            var timeDiff = getTimeDiff(startTime, endTime);        
	            
	            if(timeRange != null && timeRange.value != ""){
	                alarmCtrl.currentTimeRange = timeRange;
	                timeDiff  = timeRange.value ;
	            }
	            
	            setCustomTime(startTime, endTime);      //타임값 셋팅하고
	           // setFilterTime(startTime, endTime, timeDiff);
	            
	            if( timeRange.text == "Select Range") {
	                stopPollingAndGetAlarmHistory();
	            }else{
	                startPollingHistory();
	                //getAlarmList();
	            }
	        };
	     
	     alarmCtrl.play = function(start, end) {
             
	            var startTime = moment(start);
	            var endTime = moment(end);
	            setCustomTime(startTime, endTime);
	            
	            startPollingHistory();
	     };
	     
	     alarmCtrl.pause = function() {
	            stopPollingHistory();
	      };
	      
        alarmCtrl.forward = function(start, end) {    
            
            var timeDiff = alarmCtrl.currentTimeRange.value;    
            var endTime = moment(end);
            var startTime = moment(start); //endTime.clone().add(-timeDiff, 'seconds');
            
            setCustomTime(startTime, endTime);
            checkTimeValidate(startTime, endTime, timeDiff);
            stopPollingAndGetAlarmHistory();
        };
        
        alarmCtrl.backward = function(start, end) {
            
            var timeDiff = alarmCtrl.currentTimeRange.value;    
            var endTime = moment(end);
            var startTime = moment(start); //endTime.clone().add(-timeDiff, 'seconds');
            
            setCustomTime(startTime, endTime);        
            stopPollingAndGetAlarmHistory();
         };
         
         alarmCtrl.customDateTimeApply = function (sDateTime, eDateTime, timeRange) {
             
             stopPollingHistory();
             
             var timeDiff = getTimeDiff(sDateTime, eDateTime);    
             
             if(timeRange != null && timeRange.value != ""){
                 alarmCtrl.currentTimeRange = timeRange;
                 timeDiff  = timeRange.value ;
             }
             
             var endTime = moment(eDateTime);
             var startTime = endTime.clone().add(-timeDiff, 'seconds');
             
             setCustomTime(startTime, endTime);      //타임값 셋팅하고
           
             stopPollingAndGetAlarmHistory();
         };
         
	        
		alarmCtrl.onChangeSearchDetailTypeList = function ($index, type, typeold) {
			console.log("alarm : onChangeSearchDetailTypeList :", $index, alarmCtrl.searchDetailParamList[$index].type, type, typeold);

			if(type.value == typeold.value)
				return;

			var flag = false;
			for(var i=0; i<alarmCtrl.searchDetailParamList.length; ++i) {
				if (type.value == alarmCtrl.searchDetailParamList[i].type) {
					flag = true;
					break;
				}
			}

			alarmCtrl.searchDetailParamList[$index].type = type.value;
			alarmCtrl.searchDetailParamList[$index].value = '';

			if(flag == true) {
				$timeout(function () {
					alarmCtrl.searchDetailParamList[$index].type = typeold.value;
				}, 100);
				alert("Duplicate conditions can not be selected");
			}
		};

		alarmCtrl.clickSearchDetailAddParam = function () {
			/*var list  = angular.copy(alarmCtrl.searchDetailTypeList);
			var type = list[0].value;
			for(var i=0; i<list.length; ++i) {
				for(var j=0; j<alarmCtrl.searchDetailParamList.length; ++j) {
					console.log(i, j, list[i], alarmCtrl.searchDetailParamList[j]);
					if(list[i].value == alarmCtrl.searchDetailParamList[j].type) {
						console.log("--------");
						list.splice(i, 1);
						type = list[i].value;
						--i;
						break;
					}
				}
			}

			alarmCtrl.searchDetailParamList.push({ type:type, value:'', selectList: list });*/

			var type;
			for(var i=0; i<alarmCtrl.searchDetailTypeList.length; ++i) {
				var flag = false;
				for (var j = 0; j < alarmCtrl.searchDetailParamList.length; ++j) {
					if (alarmCtrl.searchDetailTypeList[i].value == alarmCtrl.searchDetailParamList[j].type) {
						flag = true;
						break;
					}
				}

				if(flag == false) {
					type = alarmCtrl.searchDetailTypeList[i].value;
					break;
				}
			}

			if(type)
				alarmCtrl.searchDetailParamList.push({ type:type, value:'', selectList: alarmCtrl.searchDetailTypeList });

			// alarmCtrl.searchDetailParamList.push({ type:'message', value:'', selectList: alarmCtrl.searchDetailTypeList });
		};

		alarmCtrl.clickSearchDetailRemoveParam = function (index) {
			alarmCtrl.searchDetailParamList.splice(index, 1);
		};

		alarmCtrl.clickDetailSearch = function () {
			console.log("alarm : clickDetailSearch :", alarmCtrl.searchDetailParamList);

			alarmCtrl.searchDetailMode = !alarmCtrl.searchDetailMode;

			alarmCtrl.message = null;
			alarmCtrl.serviceName = null;
			alarmCtrl.volumeName = null;
			alarmCtrl.hostName = null;
			alarmCtrl.resource = null;
			alarmCtrl.location = null;
			alarmCtrl.alarmCode = null;
			alarmCtrl.alarmName = null;
			alarmCtrl.tag = null;
			alarmCtrl.status = null;

			for(var i=0; i<alarmCtrl.searchDetailParamList.length; ++i) {
				/*switch (alarmCtrl.searchDetailParamList[i].type) {
					case alarmCtrl.searchDetailTypeList[0].value:		// message
						alarmCtrl.message = alarmCtrl.searchDetailParamList[i].value;
						break;
					case alarmCtrl.searchDetailTypeList[1].value:		// service
						alarmCtrl.service = true;
						alarmCtrl.serviceName = alarmCtrl.searchDetailParamList[i].value;
						break;
					case alarmCtrl.searchDetailTypeList[2].value:		// volume
						alarmCtrl.volume = true;
						alarmCtrl.volumeName = alarmCtrl.searchDetailParamList[i].value;
						break;
					case alarmCtrl.searchDetailTypeList[3].value:		// host
						alarmCtrl.host = true;
						alarmCtrl.hostName = alarmCtrl.searchDetailParamList[i].value;
						break;
					case alarmCtrl.searchDetailTypeList[4].value:		// alarm code
						alarmCtrl.alarmCode = alarmCtrl.searchDetailParamList[i].value;
						break;
					case alarmCtrl.searchDetailTypeList[5].value:		// alarm name
						alarmCtrl.alarmName = alarmCtrl.searchDetailParamList[i].value;
						break;
					/!*case alarmCtrl.searchDetailTypeList[6].value:		// tag
						alarmCtrl.tag = alarmCtrl.searchDetailParamList[i].value;
						break;*!/
				}*/
				switch (alarmCtrl.searchDetailParamList[i].type) {
					case alarmCtrl.searchDetailTypeList[0].value:		// message
						alarmCtrl.message = alarmCtrl.searchDetailParamList[i].value;
						break;
					case alarmCtrl.searchDetailTypeList[1].value:		// resource
						alarmCtrl.resource = alarmCtrl.searchDetailParamList[i].value;
						break;
					case alarmCtrl.searchDetailTypeList[2].value:		// location
						alarmCtrl.location = alarmCtrl.searchDetailParamList[i].value;
						break;
					case alarmCtrl.searchDetailTypeList[3].value:		// alarm code
						alarmCtrl.alarmCode = alarmCtrl.searchDetailParamList[i].value;
						break;
					case alarmCtrl.searchDetailTypeList[4].value:		// alarm name
						alarmCtrl.alarmName = alarmCtrl.searchDetailParamList[i].value;
						break;
				}
			}

			getAlarmList();
		};

		alarmCtrl.clickSearchText = function () {
			console.log("alarm : clickSearchText", alarmCtrl.searchText);

			if(alarmCtrl.searchText == null || alarmCtrl.searchText.length == 0) {
				clearFilterData();
			}
			getAlarmList();
		};

		alarmCtrl.onChangeSearchDetailInput = function (type, value) {
			// console.log("alarm : onChangeSearchDetailAlarmCode", type, value);

			switch (type) {
				case "AlarmCode":
					alarmCtrl.isSearchDetailAlarmCode = (value && value.length > 2)? true: false;
					break;
				case "AlarmName":
					alarmCtrl.isSearchDetailAlarmName = (value && value.length > 2)? true: false;
					break;
				case "Resource":
					alarmCtrl.isSearchDetailResource = (value && value.length > 2)? true: false;
					break;
				case "Location":
					alarmCtrl.isSearchDetailLocation = (value && value.length > 2)? true: false;
					break;
			}
		};

		alarmCtrl.onOverSearchDetailList = function () {

		};

		alarmCtrl.onLeaveSearchDetailList = function (type) {
			alarmCtrl["isSearchDetail"+type] = false;
		};

		alarmCtrl.onClickSearchDetailList = function (type, value) {
			console.log("alarm : onClickSearchDetailList", type, value);

			var i, len;
			switch (type) {
				case "AlarmCode":
					for (i=0, len=alarmCtrl.searchDetailParamList.length; i<len; ++i) {
						if(alarmCtrl.searchDetailParamList[i].type == alarmCtrl.searchDetailTypeList[3].value) {
							alarmCtrl.searchDetailParamList[i].value = value;
							break;
						}
					}
					break;
				case "AlarmName":
					for (i=0, len=alarmCtrl.searchDetailParamList.length; i<len; ++i) {
						if(alarmCtrl.searchDetailParamList[i].type == alarmCtrl.searchDetailTypeList[4].value) {
							alarmCtrl.searchDetailParamList[i].value = value;
							break;
						}
					}
					break;
				case "Resource":
					for (i=0, len=alarmCtrl.searchDetailParamList.length; i<len; ++i) {
						if(alarmCtrl.searchDetailParamList[i].type == alarmCtrl.searchDetailTypeList[1].value) {
							alarmCtrl.searchDetailParamList[i].value = value;
							break;
						}
					}
					break;
				case "Location":
					for (i=0, len=alarmCtrl.searchDetailParamList.length; i<len; ++i) {
						if(alarmCtrl.searchDetailParamList[i].type == alarmCtrl.searchDetailTypeList[2].value) {

							break;
						}
					}
					break;
			}

			alarmCtrl["isSearchDetail"+type] = false;
		};

		alarmCtrl.clickSearchDefine = function () {
			console.log("alarm : clickSearchDefine", alarmCtrl.searchDefineText);

			alarmCtrl.eventConfigFilterList = defineGridFilter();
			alarmCtrl.alarmCodeList = defineGridCheckFilter();

			getAlarmList();
		};

		alarmCtrl.clickEditDefine = function () {
			console.log("alarm : clickEditDefine");

			var list = [];
			for(var i=0; i<alarmCtrl.eventConfigFilterList.length; ++i) {
				if(alarmCtrl.eventConfigFilterList[i].modifySeverity && alarmCtrl.eventConfigFilterList[i].modifySeverity != alarmCtrl.eventConfigFilterList[i].severity) {
					list.push(alarmService.updateEventConfig(alarmCtrl.eventConfigFilterList[i].eventSeq, alarmCtrl.eventConfigFilterList[i].alarmName, alarmCtrl.eventConfigFilterList[i].modifySeverity));
				}
			}

			if(list.length ==  0) {
				alarmCtrl.alarmEditMode = false;
			} else {
				var all = $q.all(list).then(function (data) {
					console.log("alarm : definition update all :", data);
					alert("Update Alarm Definition");
					alarmCtrl.alarmEditMode = false;

					syncAlarmData();

					getData();
					getAllStatusList();
				});
			}
		};

		alarmCtrl.exportExcelCsv = function(type){
			excelDownload(type);
		};

		// event-handler


		// function
		function getAlarmCount() {
			alarmService.getAlarmCount(alarmCtrl.sdate.format(ConfigManager.getConst("TIME").FORMAT), alarmCtrl.edate.format(ConfigManager.getConst("TIME").FORMAT)).then(function (data) {

				alarmCtrl.count = data;
				ap($scope);
			});
		}

		function getAlarmList() {
			if(!alarmCtrl.severityList || alarmCtrl.severityList.length == 0) {
				alarmCtrl.data = {count:0, cr:0, mj:0, mi:0, list:[]};
				return;
			}
			if(!alarmCtrl.service && !alarmCtrl.volume && !alarmCtrl.host) {
				alarmCtrl.data = {count:0, cr:0, mj:0, mi:0, list:[]};
				return;
			}
			if(!alarmCtrl.alarmCodeList || alarmCtrl.alarmCodeList.length == 0) {
				alarmCtrl.data = {count:0, cr:0, mj:0, mi:0, list:[]};
				return;
			}

			alarmService.getAlarmList(alarmCtrl.sdate.format(ConfigManager.getConst("TIME").FORMAT), alarmCtrl.edate.format(ConfigManager.getConst("TIME").FORMAT),
				alarmCtrl.pageCount, alarmCtrl.pageIndex, alarmCtrl.orderBy, alarmCtrl.orderType,
				alarmCtrl.severityList, alarmCtrl.alarmCodeList, alarmCtrl.alarmCode, alarmCtrl.alarmName, alarmCtrl.message, alarmCtrl.status, alarmCtrl.tag,
				alarmCtrl.service, alarmCtrl.serviceName, alarmCtrl.volume, alarmCtrl.volumeName, alarmCtrl.host, alarmCtrl.hostName, alarmCtrl.resource, alarmCtrl.location, alarmCtrl.searchText).then(function (data) {

				alarmCtrl.data = data;
				if(alarmCtrl.isPlay == true){
				    isReceived=true;
				}
				ap($scope);
			 });
		}
		
	    function getResolvedTime() {
            alarmService.getResolvedTime(alarmCtrl.sdate.format(ConfigManager.getConst("TIME").FORMAT), alarmCtrl.edate.format(ConfigManager.getConst("TIME").FORMAT),
				alarmCtrl.severityList, alarmCtrl.alarmCodeList, alarmCtrl.alarmCode, alarmCtrl.alarmName, alarmCtrl.message, alarmCtrl.status, alarmCtrl.tag,
				alarmCtrl.service, alarmCtrl.serviceName, alarmCtrl.volume, alarmCtrl.volumeName, alarmCtrl.host, alarmCtrl.hostName, alarmCtrl.resource, alarmCtrl.location, alarmCtrl.searchText, alarmCtrl.aggregationFunc).then(function (data) {

                alarmCtrl.resolvedTime = data;
                ap($scope);
             });
        }

        function clearFilterData() {
			alarmCtrl.searchText == null;
			alarmCtrl.message = null;
			alarmCtrl.serviceName = null;
			alarmCtrl.volumeName = null;
			alarmCtrl.hostName = null;
			alarmCtrl.resource = null;
			alarmCtrl.location = null;
			alarmCtrl.alarmCode = null;
			alarmCtrl.alarmName = null;
			alarmCtrl.tag = null;
			alarmCtrl.status = null;

			for (var i=0; i<alarmCtrl.searchDetailParamList.length; ++i) {
				alarmCtrl.searchDetailParamList[i].value = "";
			}
		}

		function excelDownload(type) {
			console.log("alarm : excelDownload :", type);

			if(!alarmCtrl.severityList || alarmCtrl.severityList.length == 0) {
				alarmCtrl.data = {count:0, cr:0, mj:0, mi:0, list:[]};
				return;
			}
			if(!alarmCtrl.service && !alarmCtrl.volume && !alarmCtrl.host) {
				alarmCtrl.data = {count:0, cr:0, mj:0, mi:0, list:[]};
				return;
			}
			if(!alarmCtrl.alarmCodeList || alarmCtrl.alarmCodeList.length == 0) {
				alarmCtrl.data = {count:0, cr:0, mj:0, mi:0, list:[]};
				return;
			}

			alarmService.excelDownload(type, alarmCtrl.sdate.format(ConfigManager.getConst("TIME").FORMAT), alarmCtrl.edate.format(ConfigManager.getConst("TIME").FORMAT),
				alarmCtrl.severityList, alarmCtrl.alarmCodeList, alarmCtrl.alarmCode, alarmCtrl.alarmName, alarmCtrl.message, alarmCtrl.status, alarmCtrl.tag,
				alarmCtrl.service, alarmCtrl.serviceName, alarmCtrl.volume, alarmCtrl.volumeName, alarmCtrl.host, alarmCtrl.hostName, alarmCtrl.resource, alarmCtrl.location, alarmCtrl.searchText);
		}


		function getEventName(code) {
			for(var i=0, l=alarmCtrl.eventConfigList.length; i<l; ++i) {
				if(code == alarmCtrl.eventConfigList[i].eventSeq) {
					return alarmCtrl.eventConfigList[i].alarmName;
				}
			}
		}

		function getEventSeverity(code) {
			for(var i=0, l=alarmCtrl.eventConfigList.length; i<l; ++i) {
				if(code == alarmCtrl.eventConfigList[i].eventSeq) {
					return alarmCtrl.eventConfigList[i].severity;
				}
			}
		}

		function getEventCode(name, severity) {
			for(var i=0, l=alarmCtrl.eventConfigList.length; i<l; ++i) {
				if(name.toUpperCase() == alarmCtrl.eventConfigList[i].alarmName.toUpperCase() && severity == alarmCtrl.eventConfigList[i].severity) {
					return alarmCtrl.eventConfigList[i].eventSeq;
				}
			}
		}

		// grid
		function initializeHistoryGrid() {
			var columnDefs = [
				{
					name : 'Alarm Code',
					field : 'alarmCode',
					enableColumnMenu: false,
					cellTooltip:true,
					headerTooltip:true
				},
				{
					name : 'Alarm Name',
					field : 'alarmName',
					enableColumnMenu: false,
					cellTooltip:true,
					headerTooltip:true
				},
				{
					name : 'Severity',
					field : 'severity',
					enableColumnMenu: false,
					cellTooltip:true,
					headerTooltip:true,
					minWidth : 72,
					width : 72,
					cellTemplate : '<div class="ui-grid-cell-contents"><span class="{{grid.appScope.getSeverityClass(row)}}"></span>{{row.entity.severity}}</div>'
				},
				/*{
					name : 'Messages',
					field : 'occurMessage',
					enableColumnMenu: false,
					cellTooltip:true,
					headerTooltip:true
				},*/
				{
					name : 'Resource',
					field : 'resource',
					enableColumnMenu: false,
					cellTooltip:true,
					headerTooltip:true
				},
				{
					name : 'Location',
					field : 'location',
					enableColumnMenu: false,
					cellTooltip:true,
					headerTooltip:true
				},
				{
					name : 'Message',
					field : 'occurMessage',
					enableColumnMenu: false,
					cellTooltip:true,
					headerTooltip:true
				},
				{
					name : 'Occured Time',
					field : 'occurDate',
					enableColumnMenu: false,
					cellTooltip:true,
					headerTooltip:true,
					// minWidth : 135,
					width : 140,
					cellTemplate : '<div class="ui-grid-cell-contents" title="{{grid.appScope.getTimeFormat(row.entity.occurDate)}}">{{grid.appScope.getTimeFormat(row.entity.occurDate)}}</div>',
					sort: {
						direction: 'desc',
						priority: 1
					}
				},
				{
					name : 'Acknowledge Time',
					field : 'ackDate',
					enableColumnMenu: false,
					cellTooltip:true,
					headerTooltip:true,
					width : 140,
					cellTemplate : '<div class="ui-grid-cell-contents" title="{{grid.appScope.getTimeFormat(row.entity.ackDate)}}">{{grid.appScope.getTimeFormat(row.entity.ackDate)}}</div>'
				},
				{
					name : 'Release Time',
					field : 'releaseDate',
					enableColumnMenu: false,
					cellTooltip:true,
					headerTooltip:true,
					width : 140,
					cellTemplate : '<div class="ui-grid-cell-contents" title="{{grid.appScope.getTimeFormat(row.entity.releaseDate)}}">{{grid.appScope.getTimeFormat(row.entity.releaseDate)}}</div>'
				},
				/*{
					name : 'Tag',
					field : 'tag',
					enableColumnMenu: false,
					cellTooltip:true,
					headerTooltip:true
				},*/
				{
					name : '',
					field : 'button',
					enableColumnMenu: false,
					cellTooltip:true,
					headerTooltip:true,
					headerTemplate: '',
					cellTemplate: /*'<button type="button" class="mu-btn mu-btn-icon mu-btn-bg-non" ng-click="grid.appScope.onBtnClick1(row)" title="Tag Modify"><i class="mu-icon tag"></i></button>' +*/
									'<button type="button" class="mu-btn mu-btn-icon mu-btn-bg-non" ng-click="grid.appScope.onBtnClick2(row)" title="go to Analytics"><i class="mu-icon share"></i></button>',
					minWidth: 60,
					width: 60,
					enableSorting:false
				}];

			alarmCtrl.listGridOptions = {
				data : 'alarmCtrl.data.list',
				columnDefs : columnDefs,
				enableRowSelection: false,
				enableFullRowSelection:false,
				enableRowHeaderSelection: false,
				multiSelect:false,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
				enableExpandable: true,
				excessRows:100,
				// expandableRowTemplate: '/alarm/alarm_history_chart.html',
				enableExpandableRowHeader: false,
				useExternalSorting: true,
				appScopeProvider: {
					getSeverityClass: function(row) {
						return getGridSeverityClass(row);
					},
					/*onRowClick: function(row) {
						if(!row) return;

					}*/
					onBtnClick1:function (row) {
						// TODO. click button tag
					},
					onBtnClick2:function (row) {
						// TODO. click button share
					},
					getTimeFormat: function(time) {
						return getTimeFormat(time);
					}
				},
				onRegisterApi: function (gridApi) {
					$scope.gridApi = gridApi;
					$scope.gridApi.core.on.sortChanged($scope, alarmCtrl.sortChanged );
					alarmCtrl.sortChanged($scope.gridApi.grid, [ alarmCtrl.listGridOptions.columnDef ] );
				},
				// rowTemplate: "<div ng-click=\"grid.appScope.onRowClick(row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell dbl-click-row></div>"
			};
		}
		
		function initializeDefinitionGrid() {
			var columnDefs = [
				{
					name: ' ',
					field: 'checked',
					minWidth: 34,
					width: 34,
					cellTemplate: '<div class="ui-grid-cell-contents" style="padding: 0px 0px 0px 0px; "><input type="checkbox" ng-model="row.entity.checked" style="position:relative;" ng-click="grid.appScope.onClickGridCheckbox(row)"/><label class="no-txt" /></div>',
					headerCellTemplate: '<div class="ui-grid-cell-contents" style="padding: 5px 0px 0px 5px; border-top:none"><input type="checkbox" ng-model="grid.appScope.allChecked" style="position:relative;z-index:99999;" ng-click="grid.appScope.onClickGridCheckboxAll()" /><label class="no-txt" /></div>',
					enableColumnMenu: false,
					enableSorting:false,
					cellTooltip:true,
					headerTooltip:true
				},
				{
					name : 'Severity',
					field : 'severity',
					enableColumnMenu: false,
					cellTooltip:true,
					headerTooltip:true,
					minWidth : 110,
					width : 110,
					cellTemplate : '<div class="ui-grid-cell-contents"><div ng-show="grid.appScope.getEditMode() == false"><span class="{{grid.appScope.getSeverityClass(row)}}"></span>{{row.entity.severity}}</div><div ng-show="grid.appScope.getEditMode() == true" style="position: absolute; "><select-box values="grid.appScope.severity" selected-text="{{grid.appScope.getSelectText(row)}}" on-data-change="grid.appScope.onClickGridSelectBox(row, value)"></select-box></div></div>'
				},
				{
					name : 'Alarm Name',
					field : 'alarmName',
					enableColumnMenu: false,
					cellTooltip:true,
					headerTooltip:true
				}];

			alarmCtrl.defineGridOptions = {
				data : 'alarmCtrl.eventConfigFilterList',
				columnDefs : columnDefs,
				enableRowSelection: false,
				enableFullRowSelection:false,
				enableRowHeaderSelection: false,
				multiSelect:false,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
				enableExpandable: true,
				excessRows:100,
				// expandableRowTemplate: '/alarm/alarm_history_chart.html',
				enableExpandableRowHeader: false,
				// useExternalSorting: true,
				appScopeProvider: {
					allChecked: alarmCtrl.defineGridAllChecked,
					severity:  ConfigManager.getConst("ALARM").SEVERITY,
					getSeverityClass: function(row) {
						return getGridSeverityClass(row);
					},
					getEditMode: function() {
						return alarmCtrl.alarmEditMode;
					},
					onRowClick: function(row) {
						if(!row) return;
						selectDefineGridRow(row);
					},
					onClickGridCheckbox: function (row) {
						if(!row) return;
						checkedDefineGridRow(row);
					},
					onClickGridCheckboxAll: function () {
						allCheckedDefineGridRow($scope.defineGridApi.grid.appScope.allChecked);
					},
					onClickGridSelectBox: function (row, value) {
						if(!row) return;
						clickDefineGridSelectBox(row, value);
					},
					getSelectText: function (row) {
						if(!row) return;
						return row.entity.severity;
					}
				},
				onRegisterApi: function (gridApi) {
					$scope.defineGridApi = gridApi;
					// $scope.defineGridApi.core.on.sortChanged($scope, alarmCtrl.sortChanged );
					// alarmCtrl.sortChanged($scope.defineGridApi.grid, [ alarmCtrl.defineGridOptions.columnDef ] );
				},
				rowTemplate: "<div ng-click=\"grid.appScope.onRowClick(row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader, 'ui-grid-selected' : row.entity.selectRow }\" ui-grid-cell dbl-click-row></div>"
			};
		}

		function getTimeFormat (time) {
			return time ? moment(time).format("YYYY-MM-DD HH:mm:ss"): "";
			// return time ? moment(time, "YYYY-MM-DD hh:mm:ss"): "";
			// return time;
		}

		function getGridSeverityClass(row) {
			if(row.entity) {
				var severity = getSeverityFullName(row.entity.severity);
				return "stat " + severity.toLowerCase();
			}
		}

		function getSeverityFullName(severity) {
			if(severity == "CR")
				return "Critical";
			else if(severity == "MJ")
				return "Major";
			else if(severity == "MN")
				return "Minor";
			else if(severity == "MI")
				return "Minor";
			else
				return "";
		}

		function alarmNameFilter(data) {
			return data.reduce(function(a,b){
				if (b.alarmName && a.indexOf(b.alarmName) < 0 ) a.push(b.alarmName);
				return a;
			},[]);
		}

		function defineGridFilter() {
			var result = [];
			if(alarmCtrl.searchDefineText) {
				for (var i = 0, l = alarmCtrl.eventConfigList.length; i < l; ++i) {
					alarmCtrl.eventConfigList[i].checked = false;
					if(alarmCtrl.eventConfigList[i].alarmName.toUpperCase().indexOf(alarmCtrl.searchDefineText.toUpperCase()) > -1) {
						alarmCtrl.eventConfigList[i].checked = true;
						result.push(alarmCtrl.eventConfigList[i]);
					} else if(alarmCtrl.eventConfigList[i].severity.toUpperCase().indexOf(alarmCtrl.searchDefineText.toUpperCase()) > -1) {
						alarmCtrl.eventConfigList[i].checked = true;
						result.push(alarmCtrl.eventConfigList[i]);
					}
				}
			} else {
				for (var i = 0, l = alarmCtrl.eventConfigList.length; i < l; ++i) {
					alarmCtrl.eventConfigList[i].checked = true;
					result.push(alarmCtrl.eventConfigList[i]);
				}
			}

			return result;
		}

		function defineGridCheckFilter() {
			var result = [];
			for (var i = 0, l = alarmCtrl.eventConfigFilterList.length; i < l; ++i) {
				if(alarmCtrl.eventConfigFilterList[i].checked == true) {
					result.push(alarmCtrl.eventConfigFilterList[i].eventSeq);
				}
			}

			if (result.length == alarmCtrl.eventConfigFilterList.length) {
				$scope.defineGridApi.grid.appScope.allChecked = true;
			} else {
				$scope.defineGridApi.grid.appScope.allChecked = false;
			}

			return result;
		}

		function checkEventConfigFilterList(flag) {
			flag = flag == true? true : false;
			for (var i = 0, l = alarmCtrl.eventConfigFilterList.length; i < l; ++i) {
				alarmCtrl.eventConfigFilterList[i].checked = flag;
			}
		}

		function selectDefineGridRow(row) {
			console.log("alarm : selectDefineGridRow :", row);

			for(var i=0, l=alarmCtrl.eventConfigFilterList.length; i<l; ++i) {
				alarmCtrl.eventConfigFilterList[i].selectRow = false;
			}
			row.entity.selectRow = true;
			alarmCtrl.selectedDefineGridRow = row.entity;
		}

		function checkedDefineGridRow(row) {
			console.log("alarm : checkedDefineGridRow :", row);

			alarmCtrl.alarmCodeList = defineGridCheckFilter();
			getAlarmList();
		}

		function allCheckedDefineGridRow(allChecked) {
			console.log("alarm : checkedDefineGridRow :", allChecked);

			checkEventConfigFilterList(allChecked);
			alarmCtrl.alarmCodeList = defineGridCheckFilter();
			getAlarmList();
		}

		function clickDefineGridSelectBox(row, value) {
			console.log("alarm : clickDefineGridSelectBox :", row, value);

			row.entity.modifySeverity = value.value;
		}

		function getSelectBoxSelectValue(row) {
			return {'label': row.entity.severity, 'value': row.entity.severity};
		}
		
		function setCustomTime(start,end){
		    alarmCtrl.sdate=start;
		    alarmCtrl.edate=end;
		}
		
        function getTimeDiff(startTime, endTime) {        
            var timeRangeValue = parseInt(alarmCtrl.currentTimeRange.value);
            var curTimeRangeValue = parseInt((endTime - startTime) / 1000);
            
            if(timeRangeValue == null || timeRangeValue <= 0){
                timeRangeValue = curTimeRangeValue;
            }
            
            return timeRangeValue;
        }   
        
        
        function stopPollingAndGetAlarmHistory() {
            isRefresh = true;

            stopPollingHistory();
			getAlarmCount();
            getAlarmList();
            getResolvedTime();
          
        }
        
        
        function startPollingHistory() {
            stopPollingHistory();
            
            isRefresh = true;
            alarmCtrl.isPlay = true;
            alarmCtrl.forwardButtonDisabled = true;
            
            var timeDiff = alarmCtrl.currentTimeRange.value;
            var endTime = moment(alarmCtrl.edate);
            var startTime = endTime.clone().add(-timeDiff, 'seconds');
            
            setCustomTime(startTime, endTime);
    
            checkTimeValidate(startTime, endTime, timeDiff);

			getAlarmCount();
            getAlarmList();
            getResolvedTime();
  
            
            pollingTimer = $interval(function() {         
                if (!isReceived) {
                    return;
                }
                
                isReceived = false;
                    
                var timeDiff = alarmCtrl.currentTimeRange.value;
                endTime = moment(endTime).clone().add(POLLING_INTERVAL * 2/1000, 'seconds');
                var startTime = endTime.clone().add(-timeDiff, 'seconds');
                

                checkTimeValidate(startTime, endTime, timeDiff);

				getAlarmCount();
                getAlarmList();
                getResolvedTime();
             
                
       
            }, POLLING_INTERVAL);
        }
        
        function stopPollingHistory() {
            if (angular.isDefined(pollingTimer)) {
                $interval.cancel(pollingTimer);
                pollingTimer = undefined;
             }          
            
            isReceived = false;
            alarmCtrl.isPlay = false;
        }
        
        function checkTimeValidate(startTime, endTime, timeRange) { 
            var curTime = moment().local(); 
            
            if(endTime.valueOf() > curTime.valueOf()){
                alarmCtrl.forwardButtonDisabled = true;
            }
        }

        function syncAlarmData() {
			console.log("setAlarmManagerData");
			alarmService.setAlarmManagerData();
		}

        function getData() {
			alarmService.getEventConfigList().then(function (data) {
				alarmCtrl.eventConfigList = data;
				alarmCtrl.eventNameList = alarmNameFilter(data);
				alarmCtrl.eventConfigFilterList = defineGridFilter();
				alarmCtrl.alarmCodeList = defineGridCheckFilter();

				// getAlarmCount();
				// getAlarmList();
				// getResolvedTime();
				startPollingHistory();
			});


		}

		function getAllStatusList() {
			return alarmService.getAllStatusList().then(function (e) {
				console.log("alarm : getAllStatusList :", e);
				if(e) {
					alarmCtrl.statusServiceList = e.statusServiceList;
					alarmCtrl.statusVolumeList = e.statusVolumeList;
					alarmCtrl.statusHostList = e.statusHostList
				}
			});
		}


		function initialize() {
			initializeEventHandler();

			getData();
			getAllStatusList();

			// test
			// syncAlarmData();
			// test

			initializeHistoryGrid();
			initializeDefinitionGrid();
		}
		
		function initializeEventHandler() {
			$scope.$on("$destroy", function() {
				if ($interval) {
					clearInterval($interval);
				}				
			});
		}
		
		initialize();
	}]);
});
