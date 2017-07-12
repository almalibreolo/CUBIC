define([], function() {
	return function($rootScope, $scope, $location, $mdDialog, $http, AlarmManager, ConfigManager) {
		"use strict";

		// property
		var headerCtrl = this;
		headerCtrl.currentUrl = "/dashboard";
		
		var currentAlarmCount = {critical:0, major:0, minor:0, warning:0,total:0};
		
		var passwordValidationFlag=true;

		$scope.updateUser = {
              userpass: "",
              userpassConfirm: "",
          };
		
	    $scope.sendUser={};

		$scope.checkPass=""; 
		
		// method
		headerCtrl.navigate = function(url) {
            console.log("NAVIGATE TO", url);
            headerCtrl.currentUrl = url;
            $location.path(url);
		};
		
		headerCtrl.logout = function() {
			location.href = "/logout";
		}
		
		headerCtrl.help = function() {
			window.open("/resources/help/cubic_how_to.pdf",'Download'); 
		}
		
		headerCtrl.isActive = function(url) {
			if (url == headerCtrl.currentUrl) {
				return "active";
			} 
			
			return "";
		}
        headerCtrl.update=function(){
            showUpdatePopup();
        }


		// event-handler


		// function
		function initAlarm(data) {
		    currentAlarmCount = data.severity;
		    currentAlarmCount.total = data.total;
		    applyAlarmCount();
		}
		
		function applyAlarmCount(){
		    headerCtrl.alarmCount=currentAlarmCount;
		    ap($scope);
		}
		
	
		function onChangeAlarmListHandler(e,data){
		    var statistics = data.alarmStatistics;
		    if (!statistics) {
		    	return;
		    }
		    
		    initAlarm(statistics);
		}
		
		  function showUpdatePopup(ev) {
	            $mdDialog.show({
	                controller: updateDialogController,
	                parent:angular.element(document.body),
	                templateUrl: '/common/popup/user_update_popup_template.html',
	                targetEvent: ev,
	                clickOutsideToClose: false,
	                escapeToClose: true,
	                locals: {
	                    updateUser: $scope.updateUser,
	                    sendUser: $scope.sendUser
	                },
	            }).then(function() {

	            }, function() {
	                $mdDialog.cancel();
	            });
	        }

	        function updateDialogController($scope, $mdDialog, updateUser,sendUser) {
	            $scope.hide = function() {
	                $mdDialog.hide();
	            };

	            $scope.cancel = function() {

	                $scope.updateUser = {};
	                $mdDialog.cancel();
	            };

	            $scope.update = function() {
	                updateUserValidationCheck($scope.updateUser);
	                if(passwordValidationFlag){
	                $scope.sendUser=$scope.updateUser;
	                showPasswordConfirmPopup($scope.sendUser);
	                }
	            };
	        }
		
	        function updateUserValidationCheck(updateUser) {

	            // Password - 비밀번호 확인값과 체크
	            var pw = updateUser.userpass;
	            var pwConf = updateUser.userpassConfirm;
	            passwordValidationFlag=true;

	            if (pw != pwConf) {
	                alert("Password do not match.");
	                passwordValidationFlag=false;
	                return false;
	            }

	            return true;
	        }    
	        
	        
	        function showPasswordConfirmPopup($event) {
	            $mdDialog.show({
	                controller: passwordDialogController,
	                parent:angular.element(document.body),
	                templateUrl: '/common/popup/user_password_popup_template.html',
	                targetEvent: $event,
	                clickOutsideToClose: false,
	                escapeToClose: true,
	                locals: {
	                    checkPass: $scope.checkPass,
	                    sendUser:$event
	                },
	            }).then(function() {

	            }, function() {
	                $mdDialog.cancel();
	            });
	        }

        function passwordDialogController($scope, $mdDialog,sendUser) {
       
        
        $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {

                $scope.sendUser = {};
                $scope.checkPass="";
                $mdDialog.cancel();
            };

            $scope.confirm = function() {
                checkPassword($scope.checkPass, sendUser);
            };
        }
        
        function checkPassword(checkPass,sendUser) {
    
            $http({
                method: "POST",
                url: "/index/checkPassword.json",
                data: checkPass,
                headers: {
                    "Content-Type": "application/json"
                }
            }).success(function(data) {
                if (isSuccess(data)) {
                    updateUser(sendUser);
                    $mdDialog.cancel();
                }
            });
        }
        
        
        function updateUser(user) {
    
            $http({
                method: "POST",
                url: "/index/updateUser.json",
                data: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            }).success(function(data) {
                if (isSuccess(data)) {
                    alert("Success update password.");
                    $scope.updateUser = {};
                    $mdDialog.cancel();
                }
            });
        }

        function isSuccess(response) {
            if (response == null || response == "" || response == "undefined") { return false; }

            if (response.hasOwnProperty("result") == false) { return true; }

            if (response.result == 0) {
                if (response.errorMessage == null || response.errorMessage == "") {
                    alert("Unknown Error.");
                } else {
                    alert(response.errorMessage);
                }

                return false;
            }

            return true;
        }
		
		function initialize() {
		    headerCtrl.alarmCount = currentAlarmCount;
		    $rootScope.$on(ConfigManager.getEvent("OCCURED_ALARM"), onChangeAlarmListHandler);
		    
		    AlarmManager.getAlarmStatistics().then(function(e) {
		    	initAlarm(e);
		    });
		    
		    $("#user-button").attr("title", "Last release date: " + _version);

			var path = $location.path();
			headerCtrl.currentUrl = path && path.length > 0 ? path: headerCtrl.currentUrl;
		}
		
		initialize();
	};
});