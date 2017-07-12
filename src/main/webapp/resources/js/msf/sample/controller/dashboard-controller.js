define(["app", "msf/sample/model/dashboard-model"], function(app, DashboardModel) {
	app.controller("DashboardCtrl", ["$scope", function($scope) {
		"use strict";

		// property
		var dashboardCtrl = this;
		var dashboard = null;
		var c = 0; 	
		dashboardCtrl.data = new DashboardModel();
		

		// method


		// event-handler
		dashboardCtrl.addPanel = function() {
			dashboard.addPanelByHtml($.now(), getHtml(), 0, 0, dashboardCtrl.data.width, dashboardCtrl.data.height);
		};
		
		dashboardCtrl.changeLayout = function() {
			if (dashboardCtrl.data.type == "free") {
				dashboard.changeLayoutToFree();
			} else if (dashboardCtrl.data.type == "column") {
				dashboard.changeLayoutToColumn();
			} else if (dashboardCtrl.data.type == "tile") {
				dashboard.changeLayoutToTile();
			}
		};
		
		dashboardCtrl.changeEdit = function() {
			if (dashboardCtrl.data.edit === true) {
				dashboard.changeModeToEdit();
			} else {
				dashboard.changeModeToView();
			}
		};
		

		// function
		function initialize() { 			
			angular.element(document).ready(function() {
				dashboard = $("#dashboard").dashboard({
					layout:"",
					maxWidth: 1800,
					namespace: {
						layout: "layout-container"
					}
				});
				
				dashboard.initialize($("#dashboard"));
				
				$.validLayout();
			});
			
			initializeEventHandler();
		}

		function initializeEventHandler() {
			
		}
		
		function getHtml() {
			var title = "<h1>" + dashboardCtrl.data.title + " - " + (c++) + "</h1>";
			var html = "<div width='100%' height='100%' layout-container='vertical' gap='5px'>" +
				title + 
				"<div width='100%' height='100%'>" +
				dashboardCtrl.data.html +
				"</div>" +
				"</div>";
			
			return html;
		}

		initialize();
	}]);
});