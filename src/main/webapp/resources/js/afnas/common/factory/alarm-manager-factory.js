define([], function() {
	return function($rootScope, $http, ConfigManager) {
		'use strict';
    
    	// property
		var _worker = new Worker(ConfigManager.getConst("WEB_WORKER_URL"));
		var _sendUrl = ConfigManager.getConst("EVENT_SERVER_SEND_URL");
		var _receiveUrl = ConfigManager.getConst("EVENT_SERVER_RECEIVE_URL");
	
		
    	// method
		function connect(url, destination) {
			_worker.postMessage({
	            operation: "connect",
	            url:url,
	            destination:destination
	        });			
		}
		function send(data) {
    		_worker.postMessage({
    			operation: "send",
    			data:data
    		});
    	}
		function close() {
    		_worker.postMessage({
    			operation: "close"
    		});   		
    	}
		
		// get alarm-statistics
		function getAlarmStatistics() {
			var url = _receiveUrl + "/alarm/statistics/severity";
			return getData(url);
		}
	
		// get alarm-list
		function getAlarmList(offset, size, sortField) {
			var url = _receiveUrl + "/alarm/list";
			var param = {
				'offset': offset,
				'size': size,
				'sortField': sortField
			};
		
			return getData(url, param);
		}
		
		// acknowledge
		function acknowledge(seq, user, message) {
			var url = _sendUrl + "/alarm/acknowledge";
			var param = {
			    'alarmSeqs': seq,
			    'user': user,
			    'message': message
			}
			
			return getData(url, param);
		}
		
		// release
		function release(seq, user, message) {
			var url = _sendUrl + "/alarm/release";
			var param= {
			    'alarmSeqs': seq,
			    'user': user,
			    'message': message
			}
			
			
			return getData(url, param);			
		}
		
		// clear
		function clear(seq, user, message) {
			var url = _sendUrl + "/alarm/delete";
			var param= {
			    'alarmSeqs': seq,
			    'user': user,
			    'message': message
			}
			
			return getData(url, param);			
		}

    	// event-listener
		var _running = false;
    	_worker.onmessage = function(e) {
    		if (_running) {
    			return;
    		}
    		
    		_running = true;
    		Promise.all([getAlarmList(1, 100), getAlarmStatistics()]).then(function(values) {
    			var result = {
    			    alarmList: values[0].datas,
    			    alarmStatistics: values[1]
    			};
    			
    			$rootScope.$broadcast(ConfigManager.getEvent("OCCURED_ALARM"), result);
    			_running = false;
    		});
    	}
    	
    	
    	// function
    	function debug(message) {
    		console.log("ALARM-MANAGER: ", message);
    	}
    	
		function getData(url, parameter) {
			var promise = new Promise(function(resolve, reject) {
				$http({
					method : "POST",
					url : url,
					data : JSON.stringify(parameter),
					loader: false,
					headers : {
						"Content-Type" : "text/plain"
					}
				}).success(function(data, status, headers, config) {
					resolve(data);
				}).error(function(data, status, headers, config) {
					reject(status);
				});
			});
			return promise;
		}
		
    	return {
    		connect:connect,
    		send:send,
    		close:close,
    		getAlarmStatistics:getAlarmStatistics,
    		getAlarmList:getAlarmList,
    		acknowledge:acknowledge,
    		release:release,
    		clear:clear
    	}
	}
});