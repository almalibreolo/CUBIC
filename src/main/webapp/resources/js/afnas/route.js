define([], function() {
	return {
		defaultRoutePath : "/dashboard",
		routes : {
			"/dashboard" : {
				templateUrl : "/dashboard.html",
				dependencies : [
					"afnas/common/common",
					"afnas/common/directive/vis-network-directive",
					"afnas/common/directive/highcharts-directive",
					"afnas/dashboard/directive/time-directive",
					"afnas/dashboard/directive/current-alarm-directive",
					"afnas/dashboard/services/dashboard-service",
					"afnas/dashboard/controller/dashboard-controller",
					"afnas/common/filter/number-filter"
				]
			},
			"/system": {
				templateUrl: "/system.html",
				dependencies:[
					"afnas/system/controller/system-controller",
					"afnas/system/services/system-service"
				]
			},
			"/alarm": {
				templateUrl: "/alarm.html",
				dependencies:[
					"afnas/alarm/controller/alarm-controller",
					"afnas/alarm/services/alarm-service",
					"afnas/common/directive/selectbox-directive",
					"afnas/common/directive/time-directive",
					"afnas/common/directive/tooltip-menu-directive"
				]
			},
			"/monitoring": {
				templateUrl: "/monitoring.html",
				dependencies:[
					"afnas/monitoring/controller/monitoring-controller",
					"afnas/monitoring/services/monitoring-service",
					"afnas/common/directive/highcharts-directive",
					"afnas/common/filter/number-filter"
				]
			},
			"/analytics": {
				templateUrl: "/analytics.html",
				dependencies:[
					"afnas/analytics/controller/analytics-controller",
					"afnas/analytics/services/analytics-service"
				]
			}
		}
	};
});