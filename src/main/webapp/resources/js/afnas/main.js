require.config({
	baseUrl:"/resources/js",
	paths: {
		"angular": "lib/angular/angular.min",
		"angular-route":"lib/angular/angular-route.min",
		"angular-animate":"lib/angular/angular-animate.min",
		"angular-messages":"lib/angular/angular-messages.min",
		"angular-aria":"lib/angular/angular-aria.min",
		"angular-sanitize":"lib/angular/angular-sanitize.min",
        "angular-translate": "lib/angular/angular-translate.min",
        "angular-translate-loader-static-files": "lib/angular/angular-translate-loader-static-files.min",
        "angular-cookies": "lib/angular/angular-cookies.min",
		"angular-bind-html-compile": "lib/angular/angular-bind-html-compile.min",
		"angular-tooltips": "lib/angular/angular-tooltips.min",
		"angular-vs-repeat": "lib/angular/angular-vs-repeat",
		"angular-material": "lib/angular-material/angular-material.min",
		"ng-dialog": "lib/angular/ng-dialog.min",
		"ui-grid": "lib/angular/ui-grid",
        "jquery": "lib/jquery/jquery.min",
        "jquery-ui": "lib/jquery/jquery-ui.min",
        "jquery-blockUI": "lib/jquery/jquery.blockUI",
        "jquery-layout": "lib/jquery/jquery.layout",
        "jquery-mdi": "lib/jquery/jquery.mdi",
        "jquery-dashboard": "lib/jquery/jquery.dashboard",
        "moment": "lib/moment/moment.min",
		"vis": "lib/vis/vis.min",
		"highcharts": "lib/highcharts/highcharts.min",
		"alarm-resource-model":"afnas/common/models/alarm-resource-model",
		"ui-bootstrap": "afnas/common/directive/ui-bootstrap-tpls-0.14.1",
		"alarm-manager-factory": "afnas/common/factory/alarm-manager-factory",
        "http-interceptor-factory": "framework/factory/http-interceptor-factory",
        "dependency-resolver-factory": "framework/factory/dependency-resolver-factory",
        "exception-factory": "framework/factory/exception-factory",
        "config-manager-provider": "framework/provider/config-manager-provider",
        "window-reload-detect-provider": "framework/provider/window-reload-detect-provider",
        "html-filter": "framework/filter/html-filter",
        "route-config": "afnas/route",
        "app": "afnas/app"
	},
	shim: {
        "angular": {
            deps: ["jquery"],
            exports: "angular"
        },
        "angular-route": {
            deps: ["angular"]
        },
        "angular-animate": {
            deps: ["angular"]
        },
        "angular-translate": {
            deps: ["angular"]
        },
        "angular-aria": {
        	deps: ["angular"]	
        },
        "angular-messages": {
        	deps: ["angular"]
        },
        "angular-cookies": {
        	deps: ["angular"]
        },
        "angular-sanitize": {
        	deps: ["angular"]
        },
        "angular-bind-html-compile": {
        	deps: ["angular"]
        },
        "angular-translate-loader-static-files": {
            deps: ["angular", "angular-translate"]
        },
        "angular-vs-repeat": {
        	deps: ["angular"]
        },
        "angular-tooltips": {
            deps: ["angular"]
        },
        "angular-material": {
        	deps: ["angular", "angular-animate", "angular-messages", "angular-aria"]
        },
        "jquery-layout": {
            deps: ["jquery"]
        },
        "jquery-mdi": {
            deps: ["jquery", "jquery-ui", "jquery-layout"]
        },
        "jquery-dashboard": {
        	deps: ["jquery", "jquery-ui", "jquery-layout"]
        },
        "jquery-blockUI": {
            deps: ["jquery"]
        },
		"ng-dialog": {
			deps: ["jquery"]
		},
		"ui-bootstrap": {
			deps: ["angular"]
		},
        "app": {
        	deps: ["angular", "angular-route", "angular-translate", "angular-cookies", "angular-translate-loader-static-files", "angular-material", "jquery-blockUI", "jquery-layout", "jquery-mdi", "jquery-dashboard", "moment", "ui-bootstrap"]
        }
	}
});

require(["app"], function(app) {
    $(document).ready(function() {
		app.initialize();
    });
});