define(["app", "highcharts"], function(app, highcharts) {

	function defaultColorList() {
		return ['#f85149', '#e3c533', '#b2d56c', '#4ec891', '#4eabb0', '#5869be'];
	}
	function unusedColor() {
		return '#c8c8c8';
	}

	function createID() {
		return (new Date()).getTime() + Math.floor((Math.random() *	 1000) + 1);
	}

	function createChart(w, h, id) {
		if(!id || id.length < 1)
			id = (new Date()).getTime() + Math.floor((Math.random() *	 1000) + 1);
		return angular.element("<div id='" + id + "' style='width: " + w + "; height:" + h + "; margin: 0 auto'></div>");
	}

	function drawChart(element, options) {
		element.highcharts(options);
	}

	function drawChartByID(id, options) {
		Highcharts.chart('container', options);
	}

	function deleteChart(element) {
		var chart = element.highcharts();
		if(chart) {
			chart.destroy();
			chart = null;
		}
	}

	function redrawChart(element, options) {
		if(!element)
			return;
		if(!options)
			return;

		deleteChart(element);
		drawChart(element, options);
	}

	function getEvents(enabled) {
		return enabled == false ? {}: {
			mouseOver: function () {
				this.chart.legend.update({
					enabled: true
				});
			},
			mouseOut: function () {
				this.chart.legend.update({
					enabled: false
				});
			}
		}
	}

	function getLegend(enabled, align, labelFormatter) {
		var opt;
		if (enabled == false) {
			opt = {
				enabled: false
			};
		} else {
			opt = {
				enabled: true,
				// x: 0,
				y: 0,
				align: align ? align : "right",
				floating: true,
				padding: 0,	// 5,
				verticalAlign: "top",
				layout: "horizontal",	//"vertical",
				shadow: false,
				// itemWidth: 350,	//250,
				// backgroundColor: "rgba(255, 255, 255, 0.5)",
				/*style: { opacity: 0.5 }*/
				// symbolHeight: 12,
				// symbolWidth: 12,
				symbolRadius: 0
				// animation: false,
			};
		}
		
		if (labelFormatter) {
			opt.labelFormatter = labelFormatter;
		}
		
		return opt;
	}

	function getTitleStyleOption(value) {
		if(value == 'bold') {
			return {
				fontFamily: "malgun Gothic",
				fontSize: "14px",
				fontWeight: 'bold',
				color: "#444444"
			}
		} else if(value == 'none') {
			return {
				fontFamily: "malgun Gothic",
				fontSize: "13px",
				fontWeight: '',
				color: unusedColor()
			}
		} else {
			return {
				fontFamily: "malgun Gothic",
				fontSize: "13px",
				fontWeight: '',
				color: "#444444"
			}
		}
	}

	function getChartPieOption(title, data, bold) {
		return {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			colors: defaultColorList(),
			title: {
				text: title,
				align: 'center',
				verticalAlign: 'middle',
				y: 5,
				style: getTitleStyleOption(bold)
			},
			/*subtitle: {
				text: 'subtitle'
			},*/
			tooltip: {
				useHTML: true,
				// pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				// pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>'
				pointFormat: '<sapn style="color: {point.color}">{series.name} : ' + '{point.label}</sapn><br>',
				/*formatter: function () {
					return '<sapn style="color: {this.point.color}"> ' + this.series.name +' : ' + this.point.label + '</sapn><br>';
				},*/
				hideDelay: 1
			},
			// legend: getLegend(true, "left", function(){return this.name + ": " + (Math.round(this.percentage * 10) / 10) + "%";}),
			plotOptions: {
				pie: {
					//allowPointSelect: true,
					//cursor: 'pointer',
					dataLabels: {
						enabled: true,
						distance: -20,
						//format: '{point.percentage:.0f} %',
						style: {
							fontWeight: 'bold',
							color: 'white',
							textShadow: null	//"1px 1px contrast, -1px -1px contrast, -1px 1px contrast, 1px -1px contrast"
						},
						formatter: function (e) {
							// data 에서 처리함
							/*if (this.percentage < 20) {
								return "";
							}*/
							
							return (Math.round(this.percentage * 10) / 10) + "%";
						}
					},
					showInLegend: false,	// (data)? true: false,
					// events: getEvents(),
					size:'100%'
				}
			},
			series: [{
				name: title,
				colorByPoint: true,
				innerSize: '60%',
				data: data
			}],
			credits: {
				enabled: false
			}
		};
	}

	function getChartOption(title, data, type, stacking, bold) {
		return {
			chart: {
				type: type ? type: 'line',
				//marginLeft: 60,
				// animation: false
			},
			colors: defaultColorList(),
			title: {
				text: title,
				align: 'left',
				style: getTitleStyleOption(bold)
			},
			scrollbar: {
				enabled: false
			},
			xAxis: {
				type: "category",
				// type: 'datetime',
				categories: data.categories,
				gridLineWidth: 1,
				tickInterval: 30,
				tickWidth: 0
				/*labels: {
				 useHTML: true,
				 formatter: function() {
				 // return '<div style="color:#606060;cursor:default;font-size:11px;fill:#606060;width:20px;text-overflow:ellipsis;">' + this.value + '</div>';
				 return '<div style="width: 50px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">' + this.value + '</div>';
				 }
				 }*/
			},
			yAxis: {
				title: {
					text: null
				}
				// min: 0,
				// max: 100
			},
			tooltip: {
				shared: true,
				// valueSuffix: (unit)? unit: ' Cnt',
				useHTML: true,
				pointFormat: '<sapn style="color: {series.color}">{series.name} : ' + '{point.y}</sapn><br>',
				/*formatter: function () {
					console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
					return '<sapn style="color: {series.color}">' + this.points.series.name +' : ' + this.points.point.label + '</sapn><br>'
				},*/
				hideDelay: 1
				// animation: false
				/*crosshairs: [{
				 width: 1,
				 color: '#000'
				 }]*/
			},
			legend: getLegend(/*type == 'column'*/),
			plotOptions: {
				series: {
					// animation: false,
					marker: {
						enabled: false
						/*symbol: "circle",
						fillColor: '#FFFFFF',
						lineWidth: 2,
						lineColor: null*/
					},
					stacking: stacking ? stacking: null,		// normal / percent
					fillOpacity: 0.2,
					lineWidth: 1,
					pointWidth: 5
					// events: getEvents(type != 'column')
				}
			},
			unit: null,	//(unit)? unit: "Cnt",
			credits: {
				enabled: false
			},
			series: data.series
		};
	}

	function getChartLineOption(title, data) {
		return getChartOption(title, data,'line');
	}

	function getChartColumnOption(title, data) {
		return getChartOption(title, data, 'column');
	}

	function getChartColumnStackOption(title, data) {
		return getChartOption(title, data, 'column', 'percent');
	}


    app.directive("chartPie", function() {
        'use strict';
        
        return {
            restrict: "E",
            transclude: true,
            template:"",
            scope: {
				chartWidth: "@",
				chartHeight: "@",
				chartTitle: "=",
				data:"=",
				chartSelect: "="
            },
            link: function postLink($scope, element, attrs, controller) {
                // property
            	var target = angular.element(element);
				var id = createID();
				var chart = createChart(($scope.chartWidth ? $scope.chartWidth: '200px'), ($scope.chartHeight? $scope.chartHeight : '240px'), id);
				target.append(chart);

				var default_img = $("#chartImg"+$scope.chartTitle);
				var bold = ($scope.chartSelect == $scope.chartTitle)? 'bold': 'none';

				drawChart(chart, getChartPieOption($scope.chartTitle, $scope.data, bold));

				var unbind = [
					$scope.$watch("data", function (value, valueOld) {
						if(angular.equals(value, valueOld)) return;
						console.log("highchart : pie : data :", value);
						if(value && value.length > 0) {
							default_img.css("display", "none");
						} else {
							value= [];
							default_img.css("display", "");
						}

						drawChart(chart, getChartPieOption($scope.chartTitle, value, bold));
						ap($scope);
					}),
					$scope.$watch("chartSelect", function (value) {
						console.log("highchart : pie : chartSelect :", value, $scope.chartTitle);

						bold = ($scope.chartSelect == $scope.chartTitle)? 'bold': 'none';
						selectChart(bold);
					})
				];
            	
            	// function
				function selectChart(value) {
					chart.highcharts().setTitle(
						{ style: getTitleStyleOption(value) }
					);
				}

            	function remove() {
            		target.off("remove", remove);

					unbind.forEach(function (fn) {
						fn();
					});
            	}
            	target.on("remove", remove);
            },
            controller: ["$scope", function($scope) {
                // property
            	
            	// method
            	
            	// event-handler
            	
            	// function
            	function initialize() {
            		initializeEventHandler();
            	}
            	
        		function initializeEventHandler() {

        		}
            }] 
        }
    }).directive("chartBasic", function() {
		'use strict';

		return {
			restrict: "E",
			transclude: true,
			// template:"<div></div>",
			scope: {
				chartTitle: "=",
				chartType: "@",
				chartStacking: "@",
				chartWidth: "@",
				chartHeight: "@",
				data: "=",
				chartSelect: "="
			},
			link: function postLink($scope, element, attrs, controller) {
				// property
				var target = angular.element(element);
				var chart = createChart(($scope.chartWidth ? $scope.chartWidth: '605px'), ($scope.chartHeight? $scope.chartHeight : '280px'));
				target.append(chart);

				var bold = ($scope.chartType == 'column')? (($scope.chartSelect == $scope.chartTitle)? 'bold': 'none') : "";
				drawChart(chart, getChartOption($scope.chartTitle, $scope.data, $scope.chartType, $scope.chartStacking, bold));

				var unbind = [
					$scope.$watch("data", function (value, valueOld) {
						if(!value || angular.equals(value, valueOld)) return;
						console.log("highchart : basic : data :", value);

						drawChart(chart, getChartOption($scope.chartTitle, value, $scope.chartType, $scope.chartStacking));
					}),
					$scope.$watch("chartSelect", function (value) {
						console.log("highchart : basic : chartSelect :", value, $scope.chartTitle);
						bold = ($scope.chartType == 'column')? (($scope.chartSelect == $scope.chartTitle)? 'bold': 'none') : "";
						selectChart(bold);
					})
				];

				// function
				function selectChart(value) {
					chart.highcharts().setTitle(
						{ style: getTitleStyleOption(value) }
					);
				}

				function remove() {
					target.off("remove", remove);

					unbind.forEach(function (fn) {
						fn();
					});
				}
				target.on("remove", remove);
			},
			controller: ["$scope", function($scope) {
				// property

				// method

				// event-handler

				// function
				function initialize() {
					initializeEventHandler();
				}

				function initializeEventHandler() {

				}
			}]
		}
	});
});