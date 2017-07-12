package com.mobigen.afnas.monitoring.model;

import lombok.Data;

/**
 * Created by lyj on 2017-04-04.
 */
@Data
public class HmKafkaserverMetricsModel {
	private String collectTime;
	private String systemName;
	private String bytesinpersec;
	private String bytesoutpersec;
	private String totalfetchrequestspersec;
	private String underreplicatedpartitions;
}
