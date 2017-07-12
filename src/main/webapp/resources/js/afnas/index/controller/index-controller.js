angular.module("app", ['ngMaterial', 'ngMessages']).controller("IndexCtrl", ["$scope", "$http", "$mdDialog", function($scope, $http, $mdDialog) {
    "use strict";

    // property
    var indexCtrl = this;
    indexCtrl.user = {
        username: "",
        password: ""
    };

    $scope.addUser = {
        userId: "",
        name: "",
        userpass: "",
        userpassConfirm: "",
        email: "",
        mobilephone: "",
        telephone: ""
    };

    // method
    indexCtrl.login = function() {
        $http({
            method: "POST",
            url: "/index/login.do",
            data: JSON.stringify(indexCtrl.user),
            headers: {
                "Content-Type": "application/json"
            }
        }).success(function(data) {
            if (data.result == 1) {
                window.location = "/main";
            } else {
                alert(data.errorMessage);
            }
        });
    };

    indexCtrl.join = function() {
        showJoinPopup();
    }
    indexCtrl.clickSignUpHandler = function() {
        duplicateCheckUser();
    }

    // function

    function showJoinPopup(ev) {
        $mdDialog.show({
            controller: dialogController,
            parent:angular.element(document.body),
            templateUrl: '/index/user_add_popup_template.html',
            targetEvent: ev,
            clickOutsideToClose: false,
            escapeToClose: true,
            locals: {
                addUser: $scope.addUser
            },
        }).then(function() {

        }, function() {
            $mdDialog.cancel();
        });
    }

    function dialogController($scope, $mdDialog, addUser) {
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {

            $scope.addUser = {};

            $mdDialog.cancel();
        };

        $scope.signUp = function() {

            signUpUser($scope.addUser);
        };
    }

    function signUpUser(addUser) {
        if (!addUserValidationCheck(addUser)) return;
        $http({
            method: "POST",
            url: "/index/addUser.json",
            data: JSON.stringify(addUser),
            headers: {
                "Content-Type": "application/json"
            }
        }).success(function(data) {
            if (isSuccess(data)) {
                alert("Welcome to CUBIC, " + addUser.userId);
                $scope.addUser = {};
                $mdDialog.cancel();
            }
        });
    }

    function addUserValidationCheck(addUser) {

        // Password - 비밀번호 확인값과 체크
        var pw = addUser.userpass;
        var pwConf = addUser.userpassConfirm;
 

        if (pw != pwConf) {
            alert("Password do not match.");
            return false;
        }

        return true;
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
        $(document).ready(function() {
            /*$("#container").layout({
                gap: "0px",
                debug: false,
                namespace: {
                    layout: "layout-container"
                },
                excludes: ["indicator", "blockUI", "overlay", "ui-resizable-helper"]
            });*/

            // $.validLayout();
        });
    }

    // event-handler

    // entry-point
    initialize();

}]);