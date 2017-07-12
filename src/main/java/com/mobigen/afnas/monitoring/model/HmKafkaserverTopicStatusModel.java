package com.mobigen.afnas.monitoring.model;

import lombok.Data;

/**
 * Created by lyj on 2017-04-03.
 */
@Data
public class HmKafkaserverTopicStatusModel {
	private String collectTime;
	private String systemName;
	private String topic;
	private String bytesinpersec;
	private String bytesoutpersec;
	private String bytesrejectedpersec;
	private String failedfetchrequestspersec;
	private String messagesinpersec;
}
