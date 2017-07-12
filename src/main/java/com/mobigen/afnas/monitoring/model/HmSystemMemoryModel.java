package com.mobigen.afnas.monitoring.model;

import lombok.Data;

/**
 * Created by lyj on 2017-04-04.
 */
@Data
public class HmSystemMemoryModel {
	private String collectTime;
	private String systemName;
	private String memoryUsedPct;
}
