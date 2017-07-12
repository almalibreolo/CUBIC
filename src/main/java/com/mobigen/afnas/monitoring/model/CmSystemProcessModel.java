package com.mobigen.afnas.monitoring.model;

import lombok.Data;

/**
 * Created by lyj on 2017-04-05.
 */
@Data
public class CmSystemProcessModel {
	private String systemSeq;
	private String systemName;
	private String processSeq;
	private String processName;
	private String processStatus;
	private String runningTime;
}
