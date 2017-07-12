package com.mobigen.afnas.dashboard.model;

import lombok.Data;

@Data
public class HighestAlarmStatusModel {
	private String name;
	private String type;
	private String alarmSeverity;
	private String upTime;
	private String resource;
}
