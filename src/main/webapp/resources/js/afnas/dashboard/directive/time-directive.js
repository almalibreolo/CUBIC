define(["app", "moment"], function(app, moment) {
    app.directive("dashboardTime", ['$interval', "ConfigManager",
		function($interval, ConfigManager) {
			// return the directive link function. (compile function not needed)
			return function($scope, element, attrs) {
				var format = 'YYYY-MM-DD HH:mm:ss';
				var intervalTime = parseInt(ConfigManager.getConst("REFRESH-INTERVAL"));
				var stopTime;
				var currentTime = moment().local().format(format);

				function updateTime() {
					console.log('dashboard : time : update');
					currentTime = moment().local().format(format);
					element.text(currentTime);

					$scope.dashboardCtrl.refreshData();
				}

				function start() {
					console.log('dashboard  : time : start');

					if(angular.isDefined(stopTime)) return;
					stopTime = $interval(updateTime, intervalTime);
				}

				function stop() {
					console.log('dashboard : time : stop');

					if(angular.isDefined(stopTime)) {
						$interval.cancel(stopTime);
						stopTime = undefined;
					}
				}

				// watch the expression, and update the UI on change.
				$scope.$watch(attrs.dashboardTime, function(value) {
					console.log("dashboard : dashboardTime :", value);
					switch (value) {
						case 0:
							stop();
							break;
						case 1:
							$scope.dashboardCtrl.refreshType = 0;
							updateTime();
							break;
						default:
							updateTime();
							start();
							break;
					}
				});

				element.text(currentTime);
				// stopTime = $interval(updateTime, 1000*60*intervalTime);

				// listen on DOM destroy (removal) event, and cancel the next UI update
				// to prevent updating time after the DOM element was removed.
				element.on('$destroy', function() {
					$interval.cancel(stopTime);
				});
			}
    }]);
});