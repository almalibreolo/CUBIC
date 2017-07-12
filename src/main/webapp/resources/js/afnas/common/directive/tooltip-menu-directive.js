define(["app"], function(app) {
    app.directive("tooltipMenu",["$rootScope", function($rootScope) {
        "use strict";

        return {
            restrict: "E",
            transclude: true,
            scope: {
                show: "=",
                selfClose: "@"
            },
            template: "<div ng-transclude></div>",
            link: function postLink($scope, element) {
                var target = angular.element(element);
                var tBind = null;
                var isSelfHide = false;

                // method

                // function
                function initialize() {
                    target.css("display", "none");
                    
                    if (!$scope.selfClose) {
                        $scope.selfClose = "false";
                    }
                }

                function showTooltip() {
                    tBind = $scope.$on("hideAllTooltipMenu", onHideAllTooltipMenuHandler);
                    //angular.element("body").bind("click", onClickBodyHandler);
                    target.css("display", "block");

                    isSelfHide = true;
                    $rootScope.$broadcast("hideAllTooltipMenu");
                }

                function hideTooltip() {
                    if (tBind) {
                        tBind();
                        tBind = null;
                    }

                    angular.element("body").unbind("click", onClickBodyHandler);
                    target.css("display", "none");
                    $scope.show = false;
                    
                    ap($scope);
                }
                
                function isParent(parent, child) {            
                      var parents = angular.element(child).parents();
                      for (var i=0; i < parents.length; i++) {
                          if (parents[i] == parent) {
                              return true;
                          }
                      }
                      
                      return false;
                }
                
                function isParentClassName(className, child) {
                    var parents = angular.element(child).parents();
                    for (var i=0; i < parents.length; i++) {
                        if (parents[i].className.indexOf(className)>0) {
                            return true;
                        }
                    }
                    
                    return false;                   
                }

                // event-listener
                function onChangeShowHandler(value) {
                    if (value == true || value == "true") {
                        showTooltip();
                    } else {
                        hideTooltip();
                    }
                }

                function onClickBodyHandler(event) {
                    var t = angular.element(event.target).attr("class");
                    if ((!t || t.indexOf("tooltip-trigger") == -1)) {                        
                        if ($scope.selfClose == "true") {
                            if (!isParent(element[0], event.target) && !isParentClassName("ui-corner-all", event.target)) {
                                hideTooltip();
                            }
                        } else {
                            hideTooltip();
                        }
                    }
                }

                function onHideAllTooltipMenuHandler(event, value) {
                    if (isSelfHide) {
                        isSelfHide = false;
                        return;
                    }

                    hideTooltip();
                }

                $scope.$watch("show", onChangeShowHandler);

                // clear-memory
                function clear() {
                    hideTooltip();
                    target.off("remove", clear);
                }
                target.on("remove", clear);

                initialize();
            }
        }
    }]);
});