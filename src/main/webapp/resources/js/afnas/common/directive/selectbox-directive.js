define(["app"], function(app) {
    app.directive("selectBox", function() {
        'use strict';
        
        return {
            restrict: "E",
            transclude: true,
            template:"<div class='mu-selectbox'>" +
					 "   <button class='mu-value'>{{selectedLabel}}</button>" +
					 "   <ul class='mu-list' style='{{selectStyle}}'>" +
					 "       <li class='tooltip-trigger' ng-repeat='value in values' ng-click='onSelectValue(value)'>" +
					 "           {{value.label}}" +
					 "       </li>" +
					 "   </ul>" +
					 "</div>",
            scope: {
                selectedValue: "=?",
                values:"=",
				selectedText:"@",
                onDataChange:"&",
				mode:"@"
            },
            link: function postLink($scope, element, attrs, controller) {
            	
                // property
            	var target = angular.element(element);
            	var selectBox = target.find(".mu-selectbox");

            	$scope.selectStyle = $scope.mode && $scope.mode.toLowerCase() == "up" ? "top: -" + $scope.values.length*100 + "%;": "";
            	$scope.selectedLabel = "";
            	$scope.$watch("values", function(value) {
            		if (!value || value.length == 0) {
            			return;
            		}
   
            		$scope.selectedValue = value[0];
            		$scope.selectedLabel = $scope.selectedValue.label;
            	});

				$scope.$watch("selectedText", function(value) {
					if (!value || value.length == 0) {
						return;
					}

					if(value.$$hashKey) {
						$scope.selectedValue = value;
						$scope.selectedLabel = $scope.selectedValue.label;
					} else {
						if(value.value) {
							for (var i = 0; i < $scope.values.length; ++i) {
								if (value.value == $scope.values[i].value) {
									$scope.selectedValue = $scope.values[i];
									$scope.selectedLabel = $scope.selectedValue.label;
									break;
								}
							}
						} else {
							for(var i=0; i<$scope.values.length; ++i) {
								if(value == $scope.values[i].value) {
									$scope.selectedValue = $scope.values[i];
									$scope.selectedLabel = $scope.selectedValue.label;
									break;
								}
							}
						}
					}
				});
            	
            	$scope.isShow = false;
            	
            	// method
            	$scope.onSelectValue = function(value) {
            		var old = $scope.selectedValue;
            		$scope.selectedValue = value;
            		$scope.selectedLabel = $scope.selectedValue.label;
            		if ($scope.onDataChange) {
            			$scope.onDataChange({value:$scope.selectedValue, valueOld:old});
            		}
            	}
            	
            	// function
            	function initialize() {
            		target.on("remove", function(e){
            			target.off("remove", remove);
            		});
            	
            		selectBox.click(function(e){
            			if ($scope.isShow) {
            				selectBox.removeClass("on");
            				$scope.isShow = false;
            			} else {
            				selectBox.addClass("on");
            				$scope.isShow = true;
            				
            				selectBox.find(".mu-list").one("mouseleave", function(e) {
            					selectBox.removeClass("on");
            					$scope.isShow = false;
            				})
            			}
            		});
            	}

            	initialize();           	
            }
        }
    });
});