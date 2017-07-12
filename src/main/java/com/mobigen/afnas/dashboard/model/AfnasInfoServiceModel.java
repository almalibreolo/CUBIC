package com.mobigen.afnas.dashboard.model;

import lombok.Data;

/**
 * Created by lyj on 2016-11-03.
 */
@Data
public class AfnasInfoServiceModel {
	private String clusterName;
	private String serviceName;
	private String serviceId;
	private String serviceType;
	private String gfVolume;
	private String upTime;
	private String delFlag;
}
