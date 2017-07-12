define(["moment", "http-interceptor-factory", "exception-factory", "html-filter",
        "route-config",
        "dependency-resolver-factory",
        "config-manager-provider",
        "window-reload-detect-provider",
        "afnas/common/controller/header-controller",
        "alarm-manager-factory",
        "angular-tooltips",
        "ui-grid",
        "angular-vs-repeat",
        "ng-dialog"
    ],
    function(moment, httpInterceptorFactory, exceptionFactory, htmlFilter, routeConfig, dependencyResolverFactory, configManagerProvider, windowReloadDetectProvider, headerController, alarmManagerFactory) {
        "use strict";

        var app = angular.module("app", ["ngRoute", "ngCookies", "ngMaterial", "ngMessages", "ngAria", "pascalprecht.translate", "ui.grid", "ui.grid.selection", "ui.grid.autoResize", "720kb.tooltips", "vs-repeat", "ngDialog", "ui.bootstrap"]);
        app.factory("HttpInterceptor", ["$q", httpInterceptorFactory]);
        app.factory("AlarmManager", ["$rootScope", "$http", "ConfigManager", alarmManagerFactory]);
        app.provider("ConfigManager", [configManagerProvider]);
        app.provider("WindowReloadDetect", [windowReloadDetectProvider]);
        app.filter("html", ["$sce", htmlFilter]);
        app.controller("HeaderCtrl", ["$rootScope", "$scope", "$location","$mdDialog","$http" ,"AlarmManager", "ConfigManager", headerController]);
        app.initialize = initialize;

        // angularjs 초기화 이전에 필요한 데이터를 초기화
        var _resources = {};

        function initializeResource() {
            var $injector = angular.injector(["ng"]);
            var $q = $injector.get('$q');
            var $http = $injector.get('$http');
            var deferred = $q.defer();
            var urls = {
                constant: $http.get("/resources/constants/constant.json"),
                event: $http.get("/resources/constants/event.json"),
                timeoffset: $http.get("/time/timeoffset.json?clientDateTime=" + moment().local().format("YYYY-MM-DD HH:mm:ss"))
            };

            $q.all(urls).then(function(results) {
                _resources.constant = results.constant.data;
                _resources.event = results.event.data;
                _resources.timeoffset = results.timeoffset.data.data;
                
                // 1초 정도 차이가 나면 의미가 있다고 판단하여 시간을 보정한다
                if (Math.abs(_resources.timeoffset) > 1000) {
                	moment.now = function() {
                		return _resources.timeoffset + Date.now();
                    }               	
                }
                
                deferred.resolve(_resources);
            });

            return deferred.promise;
        }

        function config($routeProvider, $locationProvider, $controllerProvider, $httpProvider, $compileProvider, $filterProvider, $provide, $translateProvider, ConfigManagerProvider) {
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;

            $httpProvider.interceptors.push("HttpInterceptor");

            $provide.decorator("$exceptionHandler", exceptionFactory);

            $translateProvider.useStaticFilesLoader({
                prefix: "/resources/messages/",
                suffix: ".json"
            });
            $translateProvider.preferredLanguage("ko_KR");

            ConfigManagerProvider.initialize(_resources.constant, _resources.event);

            if (routeConfig.routes) {
                angular.forEach(routeConfig.routes, function(route, path) {
                    $routeProvider.when(path, {
                        templateUrl: route.templateUrl,
                        resolve: dependencyResolverFactory(route.dependencies)
                    });
                });
            }
            if (routeConfig.defaultRoutePath) {
                $routeProvider.otherwise({
                    redirectTo: routeConfig.defaultRoutePath
                });
            }

            // performance-option
            $httpProvider.useApplyAsync(true);
            $compileProvider.debugInfoEnabled(false);
        }

        function initialize() {
            initializeResource().then(function() {
                app.run(function(AlarmManager, ConfigManager) {
                    /*$("#container").layout({
                        gap: "0px",
                        debug:false,
                        namespace: {layout:"layout-container"},
                        excludes: ["indicator", "blockUI", "overlay", "ui-resizable-helper"]
                    });*/
                    
                    AlarmManager.connect(ConfigManager.getConst("EVENT_SERVER_ACTIVEMQ_URL"), ConfigManager.getConst("EVENT_SERVER_ACTIVEMQ_DESTINATION"));
                });

                app.config(config);
                angular.bootstrap(document, ["app"]);
            });
        }

        return app;
    });