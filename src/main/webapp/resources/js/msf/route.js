define([], function() {
	return {
		defaultRoutePath : "/sample-mdi",
		routes : {
			"/sample-mdi" : {
				templateUrl : "/msf/sample-mdi.html",
				dependencies : [ "msf/sample/controller/mdi-controller" ]
			},
			"/sample-dashboard" : {
				templateUrl : "/msf/sample-dashboard.html",
				dependencies : [ "msf/sample/controller/dashboard-controller" ]
			},
			"/sample-websocket" : {
				templateUrl : "/msf/sample-websocket.html",
				dependencies : [ "msf/sample/controller/websocket-controller",
						"msf/sample/service/websocket-service" ]
			}
		}
	};
});