package com.mobigen.afnas.dashboard.model;

import lombok.Data;

@Data
public class StatusClusterModel {
	private String collectTime;
	private String clusterName;
	private String overCommit;
	private String productName;
	private int brickCount;
	private int bricksActive;
	private int nodeCount;
	private int nodesActive;
	private int totalConnections;
	private int maxConnections;
	private int numConnections;
	private int smbConnections;
	private int numClients;
	private String shActive;
	private String shEnabled;
	private int snapshotCount;
	private String status;
	private String replicaStatus;
	private long usableCapacity;
	private long usedCapacity;
	private long rawCapacity;
	private int volumeCount;
	private String volumeStatus;
	private long maxCapacity;
}
