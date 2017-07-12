package com.mobigen.afnas.common.model;

import lombok.Data;

@Data
public class HostModel {

	private String hostName;
	private String collectTime;
	private String summary;

	private String cpuUsage;
	private String memUsage;
	private String dfUsed;
	private String dfFree;
	private String dfTotal;
	private String bytesIn;
	private String bytesOut;
}
