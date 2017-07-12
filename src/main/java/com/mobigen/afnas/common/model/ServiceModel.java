package com.mobigen.afnas.common.model;

import lombok.Data;

/**
 * Created by lyj on 2016-11-03.
 */
@Data
public class ServiceModel {
	// system
	private String systemGroupId;
	private String systemGroup;
	private String equipType;
	private String systemId;
	private String systemName;
	private String equipIp;

	// service
	private String serviceName;
	private String serviceId;
	private String serviceType;
	private String gfVolume;
	private String serviceDelFlag;

	// volume
	private String volumeName;
	private String volumeDelFlag;

	// service status
	private String hostName;
	private String connectionCount;

	// volume status
	private String volumeType;
	private String replicaState;
	private String usableCapacity;
	private String usedCapacity;
	private String brickcount;
	private String arbitercount;
	private String dispersecount;
	private String redundancycount;
	private String replicacount;
	private String snapshotCount;
	private String numClients;
	private String numConnections;
}
