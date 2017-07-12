define(["app", "msf/sample/model/mdi-model"], function(app, MdiModel) {
	app.controller("MdiCtrl", ["$scope", function($scope) {
		"use strict";

		// property
		var mdiCtrl = this;		
		mdiCtrl.data = new MdiModel();
		
		// method
		mdiCtrl.addMdi = function() {
			$.addWindowByHtml($.now(), mdiCtrl.data.title + " - ", mdiCtrl.data.html, mdiCtrl.data.height, mdiCtrl.data.width);
		};
		
		mdiCtrl.closeAllMdi = function() {
			$.closeAllWindow();
		};

		
		// event-handler


		// function
		function initialize() {    
			$(document).ready(function() {
				$("#mdi").mdi({
					currentWidth: 250,
					currentHeight: 300,
					taskBar:"taskbar",
					namespace: {
						layout: "layout-container"
					}
				});
				
				$.validLayout();
			});		
			
			initializeEventHandler();
		}

		function initializeEventHandler() {
			
		}
		
		initialize();
	}]);
});