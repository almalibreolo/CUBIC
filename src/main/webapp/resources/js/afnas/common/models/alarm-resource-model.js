define([], function() {
    'use strict';

    var AlarmResourceModel = (function() {
        
        var app = angular.module('app');
        
        //base-parameter-mode 의 기본 검색 주기도 바꿔줘야함
        
        var timeRangeList = [
        {
            text: "Last 30 Minute",
            value: "1800"
        }, {
            text: "Last 60 Minute",
            value: "3600"
        }, 
        {
            text: "Select Range",
            value: "",
        }];
        
        var alarmTimeRangeList = [{
            text: "Last 30 Minute",
            value: "1800"
        }, {
            text: "Last 60 Minute",
            value: "3600"
        }, {
            text: "Day",
            value: "86400"
        }, {
            text: "Week",
            value: "604800"
        }, {
            text: "Month",
            value: "18144000"
        }, {
            text: "Select Range",
            value: ""
        }];
        
        var pagePerCountList = [{
            label: "10",
            value: 10
        }, {
            label: "20",
            value: 20
        }, {
            label: "30",
            value: 30
        }, {
            label: "40",
            value: 40
        }, {
            label: "50",
            value: 50
        }];
        
        var itemsPerPage = 20;
        var maxSize = 5;
        var currentTimeRange = timeRangeList[0];
        
        var TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
        var POLLING_INTERVAL=60000;

        return {
            timeRangeList: timeRangeList,
            alarmTimeRangeList: alarmTimeRangeList,
            pagePerCountList: pagePerCountList,
            itemsPerPage: itemsPerPage,
            maxSize: maxSize,
            currentTimeRange: currentTimeRange,
            TIME_FORMAT: TIME_FORMAT,
            POLLING_INTERVAL: POLLING_INTERVAL
        }
    });

    return AlarmResourceModel;
});