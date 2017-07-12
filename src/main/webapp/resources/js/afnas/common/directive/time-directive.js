
define(["app", "moment"], function(app, moment) {
   
    app.directive("dtSelector", function() {
        return {
            restrict: "E",
            transclude: true,
            template:'<div class="mu-datepicker">'+
                '<div style="display:inline-block;" ng-class="isEnableClass()">'+
                    '<input class="date" value=""  class="datepicker"> '+
                '</div> '+
                '<div class="mu-timepicker" ng-class="isTimeEnableClass()"> '+
                    '<input ng-model="hour" ng-focus="focus(\'hour\')" ng-blur="blur(hour)" />'+
                    '<span>:</span>'+
                    '<input ng-model="min" ng-focus="focus(\'min\')" ng-blur="blur(min)" />'+
                    '<span>:</span>'+
                    '<input ng-model="sec" ng-focus="focus(\'sec\')" ng-blur="blur(sec)" />'+
                '</div>'+
            '</div>'
            ,
            scope: {
                ngId:"=",
                creationComplete:"&",
                dateSelect:"&"
            },
            link: function postLink($scope, element, attrs, controller) {
                angular.element(".date").datepicker({
                    showOn: "both", // 이미지로 사용 button , both : 엘리먼트와 이미지 동시사용
                    buttonText: "<i class='mu-icon calendar'></i>",
                    dateFormat: 'yy-mm-dd',
                    onSelect: function (dateText, inst) {
                        if($scope.dateSelect) {
                            $scope.dateSelect({date:dateText});
                        }
                    }
                }).next(".ui-datepicker-trigger").addClass("mu-btn mu-btn-icon mu-btn-icon-only datepicker");
                var sDateInput = element.find('.date');
                var isEnable = true;
                var isTimeEnable = true;
                var date = new Date();
                sDateInput.val(date.getFullYear() +"-"+ $scope.addZero((date.getMonth() + 1)) +"-"+ $scope.addZero(date.getDate()));
                
                $scope.$watch("ngId", idChange);
                $scope.hour = "00";
                $scope.min = "00";
                $scope.sec = "00";
                //초기화 하고 사용할 번수를 설정 ID 는 기본값을 가지고 들어오지 않고 변수만 바인딩
                function idChange(value) {
                    if(!value)
                        return;
                    value.setDate = setDate;
                    value.setTime = setTime;
                    value.getDateTime = getDateTime;
                    value.setDateTime = setDateTime;
                    value.enable = enable;
                    value.timeEnable = timeEnable;
                    $scope.creationComplete();
                }
                
                $scope.isEnableClass = function() {
                    if(!isEnable) {
                        return "disabled-mask";
                    }
                    else {
                        return "";
                    }
                }
                
                $scope.isTimeEnableClass = function() {
                    if(!isTimeEnable || !isEnable) {
                        return "disabled-mask";
                    }
                    else {
                        return "";
                    }
                }
                
                function enable(value) {
                    if(value == undefined)
                        return isEnable;

                    isEnable = value;
                    ap($scope);
                }
                
                function timeEnable(value) {
                    if(value == undefined)
                        return isTimeEnable;

                    isTimeEnable = value;
                }
                //YYYY-MM-DD 형식으로 입력
                function setDate(value) {
                    if(!value)
                        return;
                    var ar = value.split("-");
                    if(ar.length != 3) {
                        alert("Invalidate Date Format");
                        return ;
                    }
                    sDateInput.val(value);
                }
                
                function setTime(value) {
                    if(!value)
                        return;
                    
                    var ar = value.split(":");
                    
                    $scope.hour = ar[0];
                    $scope.min = ar[1];
                    $scope.sec = ar[2];
                }
                function setDateTime(value) {
                    if(!value)
                        return;
                    var ar = value.split(" ");
                    setDate(ar[0]);
                    setTime(ar[1]);
                }
                
                function getDateTime(){
                    return sDateInput.val() + " " + $scope.hour + ":" + $scope.min + ":" + $scope.sec;
                }
                
                
                // clear-memory
                function clear() {
                //    target.off("remove", clear);
                }
                //target.on("remove", clear);
            },
            controller: ['$scope', function( $scope ) {
                var curTarget = "sec";
                $scope.focus = function(target) {
                    curTarget = target;
                };
                
                $scope.blur = function(target) {
                    timeValidate();
                };
                
                $scope.upClick = function(){
                    if(!curTarget )
                        curTarget = "sec";
                    
                    $scope[curTarget]++;
                    
                    timeValidate();
                };
                
                $scope.downClick = function() {
                    if(!curTarget )
                        curTarget = "sec";
                    
                    $scope[curTarget]--;
                    timeValidate();
                };
                
                function timeValidate() {
                    $scope.hour =  $scope.hour > 23 ? 0 : $scope.hour;
                    $scope.hour =  $scope.hour < 0 ? 23 : $scope.hour;
                    
                    $scope.min=  $scope.min > 59 ? 0 : $scope.min;
                    $scope.min =  $scope.min < 0 ? 59 : $scope.min;
                    
                    $scope.sec =  $scope.sec > 59 ? 0 : $scope.sec;
                    $scope.sec =  $scope.sec < 0 ? 59 : $scope.sec;
                    
                    $scope.hour = $scope.addZero($scope.hour) ;
                    $scope.min = $scope.addZero($scope.min);
                    $scope.sec = $scope.addZero($scope.sec);
                }
                
                $scope.addZero = function( value) {
                    value = parseInt(value);
                    if(value < 10 )
                        return "0" + value;
                    else 
                        return value;
                };
                timeValidate();
            }]
        };
    });
    
    
    
    app.directive("dtSelectorGroup", function() {
        return {
            restrict: "E",
            transclude: true,
            template:''+
            '<div class="mu-tooltip-inner">' +
                    '<dt-selector ng-id="sSelector" creation-complete="sTimeCreationComplete()" date-select="sdateSelectEvent(date)"></dt-selector>' +
                    '<span>~</span>'+
                    '<dt-selector ng-id="eSelector" creation-complete="eTimeCreationComplete()" ></dt-selector>'+
                '</div>'+
            '</div>'+
			'<div class="mu-tooltip-foot ng-scope">'+
                '<div class="mu-btn-wrap">'+
                    '<button type="button" class="mu-btn mu-btn-icon" ng-click="applyClick()"><i class="mu-icon check"></i>Apply</button>'+
                    '<button type="button"  class="mu-btn mu-btn-icon cancel" ng-click="cancelClick()"><i class="mu-icon close"></i>Cancel</button>'+
                '</div>'+
            '</div>'+
            ''+
            '',
            scope: {
                ngId:"=",
                creationComplete:"&",       //초기화 완료되면 해당 매소드 호출
                dateTimeApply:"&",          //날짜적용을 눌렀을때 
                dateTimeCancel:"&"          //날짜적용을 눌렀을때 
            },
            link: function postLink($scope, element, attrs, controller) {
                var unbind = [$scope.$watch("ngId", idChange)];
                //초기화 하고 사용할 번수를 설정 ID 는 기본값을 가지고 들어오지 않고 변수만 바인딩
                
                var type = "range"; //기본은 범위지정이다.
                $scope.sSelector = {};
                $scope.eSelector = {};
                
                $scope.sSelectCreated = false;
                $scope.eSelectCreated = false;
                
                function idChange(value) {
                    value.setStartDateTime = setStartDateTime;
                    value.setEndDateTime = setEndDateTime;
  
                    value.setType = setType;
                    $scope.creationComplete();
                }
                
                function setType(value) {
                    type = value;
                    
                    $scope.sSelector.timeEnable(true);
                    $scope.eSelector.enable(true);
                    
                    if(value != "range") {
                        $scope.sSelector.timeEnable(false);
                        $scope.eSelector.enable(false);
                        
                        var sDateTime = "";
                        var eDateTime = "";
                        
                        if(value == "Day") {
                            sDateTime =  moment().local().format("YYYY-MM-DD") + " 00:00:00";
                            eDateTime =  moment().local().format("YYYY-MM-DD") + " 23:59:59";
                            
                        }
                        else if(value == "Week") {
                            sDateTime =  moment().local().add(-6, "day").format("YYYY-MM-DD") + " 00:00:00";
                            eDateTime =  moment().local().format("YYYY-MM-DD") + " 23:59:59";
                            
                        }
                        else if(value == "Month") {
                            sDateTime =  moment().local().add(-1, "months").add('1','day').format("YYYY-MM-DD") + " 00:00:00";
                            eDateTime =  moment().local().format("YYYY-MM-DD") + " 23:59:59";
                        }
                        setStartDateTime(sDateTime);
                        setEndDateTime(eDateTime);
                    }
                }
                
                $scope.sdateSelectEvent = function(date) {
                    var curTime = moment(date);
                    var sDateTime = "";
                    var eDateTime = "";
                    
                    if(type == "Day") {
                        sDateTime =  curTime.format("YYYY-MM-DD") + " 00:00:00";
                        eDateTime =  curTime.format("YYYY-MM-DD") + " 23:59:59";
                    }
                    else if(type == "Week") {
                        sDateTime =  curTime.format("YYYY-MM-DD") + " 00:00:00";
                        eDateTime =  curTime.add(6, "day").format("YYYY-MM-DD") + " 23:59:59";
                    }
                    else if(type == "Month") {
                        sDateTime =  curTime.format("YYYY-MM-DD") + " 00:00:00";
                        eDateTime =  curTime.add(1, "months").add(-1,'day').format("YYYY-MM-DD") + " 23:59:59";
                    }
                    else {
                        return;
                    }
                    setStartDateTime(sDateTime);
                    setEndDateTime(eDateTime);
                }

                function setStartDateTime(dateTime){
                    
                    if(!$scope.validateDateTime(dateTime)) {
                        alert("Invalid Start DateTime" );
                        return ;
                    }
                    var ar = dateTime.split(" ");
                    $scope.sDate = ar[0];
                    $scope.sTime = ar[1];
                    
                    if( $scope.sSelectCreated ) 
                        $scope.sTimeCreationComplete();

                }
                function setEndDateTime(dateTime) {
                    if(!$scope.validateDateTime(dateTime)) {
                        alert("Invalid End DateTime" );
                        return ;
                    }
                    var ar = dateTime.split(" ");
                    $scope.eDate = ar[0];
                    $scope.eTime = ar[1];
                    if( $scope.eSelectCreated )
                        $scope.eTimeCreationComplete();
                }
            },
            controller: ['$scope', function( $scope ) {
                $scope.sSelectCreated = false;
                $scope.eSelectCreated = false;
                
                $scope.applyClick = function() {
                    if($scope.dateTimeApply) {
                        var sdt = $scope.sSelector.getDateTime();
                        var edt = $scope.eSelector.getDateTime();
                        
                        if(!$scope.validateDateTime(sdt)) {
                            alert("Invalid Start DateTime" );
                            return;
                        }
                        if(!$scope.validateDateTime(edt)) {
                            alert("Invalid End DateTime" );
                            return;
                        }
                        if(sdt > edt) {
                            alert("Wrong date range.");
                            return;
                        }
                                
                        $scope.dateTimeApply({startDateTime: sdt, endDateTime: edt});
                    }
                        
                }
                $scope.cancelClick = function() {
                    if($scope.cancelClick) {
                        $scope.dateTimeCancel();
                    }
                }
                
                //sDate, sTime 값이 있으면 최초 값을 할당해준다.
                $scope.sTimeCreationComplete = function() {
                    $scope.sSelectCreated = true;
                    
                    $scope.sSelector.setDate($scope.sDate);
                    $scope.sSelector.setTime($scope.sTime);
                }
                
                //eDate, eTime 값이 있으면 최초 값을 할당해준다.
                $scope.eTimeCreationComplete = function() {
                    $scope.eSelectCreated = true;
                    $scope.eSelector.setDate($scope.eDate);
                    $scope.eSelector.setTime($scope.eTime);
                }
                
                
                //YYYY-MM-DD HH:mm:ss  포멧 체크
                $scope.validateDateTime = function(value) {
                    var isValid = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])\s([1-9]|[01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/.test(value);
                     if (!isValid) {
                         return false;
                     }
                     return true;
                }
            }]
        };
    });
    
    
    
    app.directive("timeControl", function() {
        'use strict';
        
        return {
            restrict: "E",
            transclude: true,
            template: ' <span id="timeInfoId"><b>{{startTime.format("YYYY-MM-DD HH:mm:ss")}} ~ {{endTimeShowFormat()}}</b></span>'
                + '     <select-box  id="timeRangTxt" values="timeRanges" on-data-change="timeRangeSelect(value)"></select-box>'
                + '     <div class="mu-item-group">'
                + '         <button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only" title="backward" ng-click="backward()" ><i class="mu-icon prev"></i></button>'
                + '         <button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only" title="pause" ng-click="pause()"  ng-disabled="playButtonDisabled"><i ng-class="playClass()"></i></button>'
                + '         <button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only" title="forward" ng-click="forward()" ng-disabled="forwardButtonDisabled"><i class="mu-icon next"></i></button>'
                + '     </div>'
			    + '     <tooltip-menu id="resultDateBox" class="mu-tooltip" style="top:22px;left:650px;z-index:10;" self-close="true" show="dateTimeSelectShow">'
                + '         <dt-selector-group ng-id="dtSelectGroup" date-time-apply="applyClick(startDateTime, endDateTime)" date-time-cancel="cancelClick()" creation-complete="dtCreationComplete()"></dt-selector-group>'
                + '     </tooltip-menu>'
                ,       
            scope: {
                startTime: "=?", // "yyyy-mm-dd HH:mm:ss" //형태
                endTime: "=?", // "yyyy-mm-dd HH:mm:ss" //형태    
                isPlay: "=", // true/false - watch 로 변경가능
                forwardButtonDisabled: "=", // true/false
                pTimeRangeChange: "&?", //타임 박스 변경했을때 
                pPlay: "&?",              // function play
                pPause: "&?",               // function pause 같은 버튼
                pBackward: "&?",             // function
                pForward: "&?",           // function
                dateTimeApply:"&",          //날짜적용을 눌렀을때 
                dateTimeCancel:"&",          //날짜적용을 눌렀을때
                creationComplete:"&",       //초기화 완료되면 해당 매소드 호출
                positionTop:"&?",              //resultDateBox 위치 조정
                positionRight:"&?",              //resultDateBox 위치 조정
                
            },
            link: function postLink($scope, element, attrs, controller) {
                // property
                var target = angular.element(element);
                $scope.dtSelectGroup = {};        //날짜 지시자 접근할수 잇는 변수
                
                // function
                function remove() {
                    target.off("remove", remove);
                }
                target.on("remove", remove);
            },
            controller: ["$scope", "ConfigManager", function($scope, ConfigManager) {
                // property
                $scope.timeRanges = ConfigManager.getConst("TIME").TIME_RANGES;
                $scope.currentTimeRange = $scope.timeRanges[0];
                $scope.dateTimeSelectShow = false;
                $scope.playButtonDisabled = false;
                
                
                var lastSendStartTime ;
                var lastSendEndTime;
                
              
                // method
             
                
                $scope.endTimeShowFormat = function() {
                    if (!$scope.startTime || !$scope.endTime) {
                        return;
                    }
                    
                    if ($scope.startTime.format("YYYY-MM-DD") == $scope.endTime.format("YYYY-MM-DD")) {
                        return $scope.endTime.format("HH:mm:ss");
                    } else {
                        return $scope.endTime.format("YYYY-MM-DD HH:mm:ss");
                    }                    
                };
                
                
              
                $scope.timeRangeSelect = function(timeRange) {
                    $scope.timeRangeVisible = false;
                    $scope.playButtonDisabled = true;
                    
                    // normal
                    if (timeRange.label == "Select Range") {
                        
                        $scope.dateTimeSelectShow = true;               
                        $scope.dtSelectGroup.setStartDateTime(getTimeFormat($scope.startTime));
                        $scope.dtSelectGroup.setEndDateTime(getTimeFormat($scope.endTime));
                        $scope.dtSelectGroup.setType("range");
                        $scope.currentTimeRange = timeRange;
                        var diff = parseInt(($scope.endTime - $scope.startTime) / 1000); 
                    
                    } else if (timeRange.label == "Day" || timeRange.label == "Week" || timeRange.label == "Month" ) {

                        $scope.dateTimeSelectShow = true;               
                        $scope.dtSelectGroup.setType(timeRange.label);
                        $scope.currentTimeRange = timeRange;
                    } else {
                        $scope.playButtonDisabled = false;
                        var timeValue = parseInt(timeRange.value) ;
                        var timeGap = parseInt(timeRange.gap) ;
                        
                        var curTime = moment().local();
                        curTime = getValidateTimeFormat(timeGap, curTime);
                        
                        var beforeTime = curTime.clone().add(-timeValue + timeGap, 'seconds');
                        $scope.currentTimeRange = timeRange;
                        
                        if( $scope.pTimeRangeChange ) {
                            lastSendStartTime = beforeTime;
                            lastSendEndTime = curTime;
                            
                            $scope.pTimeRangeChange({start:getTimeFormat(beforeTime), end:getTimeFormat(curTime), timeRange:angular.copy(timeRange)});
                        }                      
                    }
               };
               

               $scope.playClass = function() {
                   return $scope.isPlay ? "mu-icon pause" : "mu-icon play";
               };
               
               $scope.pause = function(){
                   if(!$scope.isPlay) {                   // 실시간처리일경우 리얼타임으로      리얼타임일경우 시간은 변경해서 보내야한다.
                       //진행
                       if( $scope.currentTimeRange && $scope.currentTimeRange.value == "" ) {
                           $scope.currentTimeRange = $scope.timeRanges [0];//특정값이면 1분감시로
                       }
                       
                       var curTime = moment().local();
                       var beforeTime = moment().local().add(-$scope.currentTimeRange.value, 'seconds');
                       
                       $scope.isPlay = true;
                       
                       lastSendStartTime = beforeTime;
                       lastSendEndTime = curTime;
                       
                       $scope.pPlay({start:getTimeFormat(beforeTime), end:getTimeFormat(curTime)});
                   }
                   else {                          //실시간 처리가 아닐경우 시간은 현재 있는것
                       //멈춤
                       $scope.pPause();
                   } 
                   $scope.forwardButtonDisabled = true;
                   
               };
               // before
               $scope.backward = function() {
                   var timeRange = $scope.currentTimeRange;
                   var timeDiff = $scope.currentTimeRange.value;
                   var startTime; 
                   var endTime;
                  // console.log(getTimeFormat(lastSendStartTime), getTimeFormat(lastSendEndTime));
                   if(timeRange.text == "Day" || timeRange.text == "Week" || timeRange.text == "Month" || timeRange.text == "Select Range" )  {
                       var timeGap = $scope.currentTimeRange.gap ;
                       startTime = lastSendStartTime.clone().add(-timeDiff - timeGap, 'seconds') ;
                       endTime = lastSendEndTime.add(-timeDiff - timeGap , 'seconds');
                   }else {
                       startTime = $scope.startTime.clone().add(-timeDiff, 'seconds') ;
                       endTime = $scope.endTime.add(-timeDiff , 'seconds');
                   }
                   
                   lastSendStartTime = startTime;
                   lastSendEndTime = endTime;
                   
                   // console.log(getTimeFormat(startTime), getTimeFormat(endTime));
                   $scope.pBackward({start:getTimeFormat(startTime), end:getTimeFormat(endTime)});
                   $scope.forwardButtonDisabled = false;
                   $scope.isPlay = false;
               };
               
               // forward
               $scope.forward = function() {
                    var timeRange = $scope.currentTimeRange;
                    var timeDiff = $scope.currentTimeRange.value;
                    var startTime; 
                   var endTime;
                   if(timeRange.text == "Day" || timeRange.text == "Week" || timeRange.text == "Month" || timeRange.text == "Select Range" )  {
                       var timeGap = $scope.currentTimeRange.gap ;
                       startTime = lastSendStartTime.clone().add(timeDiff + timeGap, 'seconds') ;
                       endTime = lastSendEndTime.add(timeDiff + timeGap , 'seconds');
                   }else {
                       startTime = $scope.startTime.clone().add(timeDiff, 'seconds') ;
                       endTime = $scope.endTime.add(timeDiff , 'seconds');
                   }
                    lastSendStartTime = startTime;
                    lastSendEndTime = endTime;

                    $scope.isPlay = false;
                    //console.log(getTimeFormat(startTime), getTimeFormat(endTime));
                    $scope.pForward({start:getTimeFormat(startTime), end:getTimeFormat(endTime)});
               };
                
               //dtSelect 가 생성되면
               $scope.dtCreationComplete = function() {
                   $scope.dtSelectGroup.setStartDateTime(getTimeFormat($scope.startTime));
                   $scope.dtSelectGroup.setEndDateTime(getTimeFormat($scope.endTime));
               }
               
               $scope.applyClick = function(sdt, edt) {
                   var timeRange  = angular.copy($scope.currentTimeRange);
                   var s = moment(sdt);
                   var e = moment(edt);
                   var tempTime = e.clone().add(-1, "month");
                   if( s< tempTime ) {
                       alert("Invalidate Time Range(miximum 1 month)");
                       return;
                   }
                   timeRange.value = (e - s) / 1000;
                   
                   $scope.currentTimeRange = timeRange;
                   $scope.dateTimeSelectShow = false;
                   
                   lastSendStartTime = s;
                   lastSendEndTime = e;
                   
                   if($scope.dateTimeApply) {
                       $scope.dateTimeApply({startDateTime: sdt, endDateTime: edt, timeRange:timeRange});
                   }
               }
               
               $scope.cancelClick = function() {
                   $scope.dateTimeSelectShow = false;
                   
                   if($scope.cancelClick) {
                       $scope.dateTimeCancel();
                   }
               }
                // event-handler
                
                // function
               function timeListChange(value) {
                   if( $scope.timeRanges  === value)
                       return;
                   
                   if(!value) {            //또해주는이유는 value 가 아얘 없을경우 여기가 value 가 undefined 가 나와서 에러가 날 수도 있기때문에
                       value =ConfigManager.getConst("TIME").TIME_RANGES;
                   }
                   
                   $scope.timeRanges  = value;
                   $scope.startTime = moment().local().add(-$scope.timeRanges [0].value, 'seconds');
                   $scope.endTime = moment().local();
                   $scope.currentTimeRange = $scope.timeRanges [0];
                   
                   lastSendStartTime = $scope.startTime;
                   lastSendEndTime = $scope.endTime;
                   
                   value.setTimeRange = setTimeRange;
               }
               function setTimeRange(start, end) {
                   var value = "";     //공백이 사용자 지정 선택이다
                   for(var i=0; i<$scope.timeRanges .length ;i++) {
                       if(value == $scope.timeRanges [i].value) {
                           if(start)
                               $scope.startTime = moment(start);
                           if(end)
                               $scope.endTime = moment(end);
                           
                           $scope.dtSelectGroup.setStartDateTime(getTimeFormat($scope.startTime));
                           $scope.dtSelectGroup.setEndDateTime(getTimeFormat($scope.endTime));
                           $scope.dtSelectGroup.setType("range");
                           $scope.currentTimeRange = $scope.timeRanges [i];
                       }
                   }
               }
               
               //time 는 moment 형식으로 들어옴
               function getValidateTimeFormat(gap, time) {
                   var s = parseInt(time.format("ss"));
                   time.add(-(s% gap), 'seconds');
                   return time;
               }
               
               function getTimeFormat(date){
                   return date.format("YYYY-MM-DD HH:mm:ss");
               }
               
     
                function initialize() {
                  
                    initializeEventHandler();
                    if($scope.positionTop != null && $scope.positionTop != ""){
                        angular.element("#resultDateBox").css("top", "100px");
                    }
                    if($scope.positionRight != null && $scope.positionRight != ""){
                        angular.element("#resultDateBox").css("right", "225px");
                    }
                    
                    $scope.$watch("values", timeListChange);
                    
                    if( !$scope.timeRanges) {
                        timeListChange(ConfigManager.getConst("TIME").TIME_RANGES);
                    }
                }
                
                function initializeEventHandler() {
                    
                }
            }] 
        }
    });
});