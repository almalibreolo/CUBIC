define([], function() {
	return function($scope, $location) {
		"use strict";

		// property
		var headerCtrl = this;

		// method
		headerCtrl.navigate = function(url) {
            console.log("NAVIGATE TO", url);
            $location.path(url);
		};


		// event-handler


		// function
		function initialize() {
			headerCtrl.currentNavItem = "page-mdi";
		}
		
		initialize();
	};
});