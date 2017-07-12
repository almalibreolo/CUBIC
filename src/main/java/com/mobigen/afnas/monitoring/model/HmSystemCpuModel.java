package com.mobigen.afnas.monitoring.model;

import lombok.Data;

/**
 * Created by lyj on 2017-04-04.
 */
@Data
public class HmSystemCpuModel {
	private String collectTime;
	private String systemName;
	private String pluginInstance;
	private String cpuIdle;
	private String cpuIdleCalc;
}
