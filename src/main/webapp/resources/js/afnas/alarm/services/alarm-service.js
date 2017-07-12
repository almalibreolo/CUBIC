define(["app"], function(app) {
    app.service("alarmService", ["$rootScope", "$http", function($rootScope, $http) {
		"use strict";
        
		// property
		var self = this;

		self.orderByOccurDate = "OCCUR_DATE";
		self.orderTypeDec = "DESC";
		self.orderTypeAsc = "ASC";
		self.severityCritical = "CR";
		self.severityMajor = "MJ";
		self.severityMinor = "MI";
		self.statusO = "O";
		self.statusC = "C";
		self.statusA = "A";
		self.typeService = "service";
		self.typeVolume = "volume";
		self.typeHost = "host";
		


		// method
		self.getAlarmCount = function (sdate, edate) {
			if(!sdate || !edate) {
				console.error("getAlarmCount parameter error");
				return;
			}

			return getData('/alarm/getAlarmCount.json', { sdate: sdate, edate: edate});
		};

		self.getAlarmList = function (sdate, edate, pageCount, pageIndex, orderBy, orderType,
									  severityList, alarmCodeList, alarmCode, alarmName, occurMessage, status, tag,
									  service, serviceName, volume, volumeName, host, hostName, resource, location, searchText) {
			if(!sdate || !edate || !pageCount) {
				console.error("getAlarmList parameter error");
				return;
			}

			var parameter = makeParameterPaging(sdate, edate, pageCount, pageIndex, orderBy, orderType,
				severityList, alarmCodeList, alarmCode, alarmName, occurMessage, status, tag,
				service, serviceName, volume, volumeName, host, hostName, resource, location, searchText);

			return getData('/alarm/getAlarmList.json', parameter);
		};

		self.getAlarmListByParam = function (parameter) {
			if(!parameter) {
				console.error("getAlarmList parameter error");
				return;
			}

			return getData('/alarm/getAlarmList.json', parameter);
		};

		self.getEventConfigList = function () {
			return getData('/alarm/getEventConfigList.json');
		};

		self.getEventConfig = function (alarmName, severity) {
			return getData('/alarm/getEventConfig.json', { alarmName: alarmName, severity: severity });
		};

		self.updateEventConfig = function (eventSeq, alarmName, severity) {
			return getData('/alarm/updateEventConfig.json', { eventSeq:eventSeq, alarmName:alarmName, severity:severity });
		};
		
		self.getResolvedTime= function (sdate, edate,
										severityList, alarmCodeList, alarmCode, alarmName, occurMessage, status, tag,
										service, serviceName, volume, volumeName, host, hostName, resource, location, searchText, aggregationFunc) {
		    if(!sdate || !edate ) {
                console.error("getResolvedTime parameter error");
                return;
            }

            var parameter = makeParameter(sdate, edate,
				severityList, alarmCodeList, alarmCode, alarmName, occurMessage, status, tag,
				service, serviceName, volume, volumeName, host, hostName, resource, location, searchText);

            parameter.aggregationFunc=aggregationFunc;

		   return getData('/alarm/getResolvedTime.json', parameter);  
		};

		self.getAllStatusList = function (parameter) {
			return getData('/common/getAllStatusList.json', parameter);
		};

		self.excelDownload = function(type, sdate, edate,
									  severityList, alarmCodeList, alarmCode, alarmName, occurMessage, status, tag,
									  service, serviceName, volume, volumeName, host, hostName, resource, location, searchText) {

			var parameter = makeParameter(sdate, edate,
				severityList, alarmCodeList, alarmCode, alarmName, occurMessage, status, tag,
				service, serviceName, volume, volumeName, host, hostName, resource, location, searchText);

			var form = document.getElementById("excelForm");
			var jqueryF = $('#excelForm');
			jqueryF.empty();

			form.setAttribute("method", "post");
			form.setAttribute("action", "/alarm/excelDownloadHssf.json");

			var input_type = document.createElement("input");
			input_type.setAttribute("type", "hidden");
			input_type.setAttribute("name", "fileType");
			input_type.setAttribute("value", type);
			form.appendChild(input_type);

			var input_obj = document.createElement("input");
			input_obj.setAttribute("type", "hidden");
			input_obj.setAttribute("name", "param");
			input_obj.setAttribute("value", JSON.stringify(parameter));
			form.appendChild(input_obj);
			form.submit();
		};

		self.setAlarmManagerData = function () {
			return getData('/common/setAlarmManagerData.do');
		};


		// event-handler


		// function
		function initialize() {    

		}
		
		function getData(url, parameter) {
			console.log("alarm : getData :", url, parameter);
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
					console.log("alarm : getData : success :", data);
					resolve(data.data);
				}).error(function(data, status, headers, config) {
					console.log("alarm : getData : error :", data, status);
					reject(status);
				});
			});
			return promise;
		}

		function makeParameter(sdate, edate,
							   severityList, alarmCodeList, alarmCode, alarmName, occurMessage, status, tag,
							   service, serviceName, volume, volumeName, host, hostName, resource, location, searchText) {
			var parameter = {};
			parameter.sdate = sdate;
			parameter.edate = edate;
			parameter.severityList = severityList && severityList.length ? severityList : null;
			parameter.alarmCodeList = alarmCodeList && alarmCodeList.length ? alarmCodeList : null;
			parameter.alarmCode = alarmCode ? alarmCode : null;
			parameter.alarmName = alarmName ? alarmName : null;
			parameter.occurMessage = occurMessage ? occurMessage : null;
			parameter.status = status ? status : null;
			parameter.tag = tag ? tag: null;
			parameter.searchText = searchText ? searchText:null;
			if(service) {
				parameter.service = true;
				parameter.serviceName = serviceName? serviceName: null;
			}
			if(volume) {
				parameter.volume = true;
				parameter.volumeName = volumeName? volumeName: null;
			}
			if(host) {
				parameter.host = true;
				parameter.hostName = hostName? hostName: null;
			}
			parameter.resource = resource ? resource: null;
			parameter.location = location ? location: null;

			return parameter;
		}

		function makeParameterPaging(sdate, edate, pageCount, pageIndex, orderBy, orderType,
									 severityList, alarmCodeList, alarmCode, alarmName, occurMessage, status, tag,
									 service, serviceName, volume, volumeName, host, hostName, resource, location, searchText) {

			var parameter = makeParameter(sdate, edate,
				severityList, alarmCodeList, alarmCode, alarmName, occurMessage, status, tag,
				service, serviceName, volume, volumeName, host, hostName, resource, location, searchText);

			parameter.size = pageCount;
			parameter.offset = pageIndex ? ((pageIndex - 1) * pageCount) : 0;
			parameter.orderBy = orderBy;
			parameter.orderType = orderType;

			return parameter;
		}
        
		initialize();
	}]);
});