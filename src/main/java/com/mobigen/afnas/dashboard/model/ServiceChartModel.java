package com.mobigen.afnas.dashboard.model;

import lombok.Data;

@Data
public class ServiceChartModel {
	private String serviceName;
	private String serviceValue;
	private String serviceTotal;
	private String collectTime;
}
