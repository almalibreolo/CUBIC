angular.module("app", []).controller("IndexCtrl", ["$scope", "$http", function($scope, $http) {
	"use strict";
	
	// property
	var indexCtrl = this;
	indexCtrl.user = {
		username:"",
		password:""
	};
	
	// method
	indexCtrl.login = function () {
        $http({
            method: "POST",
            url: "/login.do",
            data: JSON.stringify(indexCtrl.user),
            headers: {
            	"Content-Type": "application/json"
            }
        }).success(function(data) {
            if (data.result == 1) {
            	window.location = "/msf/main";
            } else {
            	alert(data.errorMessage);
            }
        });	    
	};
	
	// function
	function initialize() {
		angular.element(document).ready(function(){
            $("#container").layout({
                gap: "0px",
                debug: false,
                excludes: ["indicator", "blockUI", "overlay", "ui-resizable-helper"]
            });			
		});
	}
	
	// event-handler
	
	
	// entry-point
	initialize();
	
}]);