package com.mobigen.afnas.alarm.model;

import lombok.Data;

import java.util.List;

@Data
public class EventHistoryParamModel {

	private String sdate;
	private String edate;
    private List<String> severityList;
    private String occurMessage;
    private String status;
    private String service;
    private String serviceName;
	private String volume;
	private String volumeName;
	private String host;
	private String hostName;
    private String alarmCode;
    private List<String> alarmCodeList;
	private String alarmName;
    private String searchText;
	private String resource;
	private String location;
    private String orderBy;
	private String orderType;
	private int size;
	private int offset;
	private String aggregationFunc;
}
