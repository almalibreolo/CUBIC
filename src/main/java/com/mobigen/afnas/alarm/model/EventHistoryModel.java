package com.mobigen.afnas.alarm.model;

import lombok.Data;

@Data
public class EventHistoryModel {

    private long alarmSeq;
    private String alarmCode;
    private String status;
    private String alarmName;
    private String resource;
    private String location;
    private String severity;
    private String occurDate;
    private String occurUser;
    private String occurMessage;
    private String releaseDate;
    private String releaseUser;
    private String releaseMessage;
    private String ackDate;
    private String ackUser;
    private String ackMessage;
    private String deleteDate;
    private String deleteUser;
    private String deleteMessage;
    private String statusChangeDate;
    private int times;
    private int duration;
    private String processName;
    private String etc1;
    private String etc2;
}
