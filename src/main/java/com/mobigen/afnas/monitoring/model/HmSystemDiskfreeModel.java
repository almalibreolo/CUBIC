package com.mobigen.afnas.monitoring.model;

import lombok.Data;

/**
 * Created by lyj on 2017-04-05.
 */
@Data
public class HmSystemDiskfreeModel {
	private String collectTime;
	private String systemName;
	private String dfUsed;
}
