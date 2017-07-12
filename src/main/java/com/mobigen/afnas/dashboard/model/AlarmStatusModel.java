package com.mobigen.afnas.dashboard.model;

import lombok.Data;

/**
 * created by lyj on 2016-11-29.
 */
@Data
public class AlarmStatusModel {
	private String svcAlarmCount;
	private String svcAlarmTotal;
	private String volAlarmCount;
	private String volAlarmTotal;
	private String hostAlarmCount;
	private String hostAlarmTotal;
	private String clusterName;
}
