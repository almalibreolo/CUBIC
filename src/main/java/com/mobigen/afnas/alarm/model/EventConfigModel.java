package com.mobigen.afnas.alarm.model;

import lombok.Data;

@Data
public class EventConfigModel {

    private String insertTime;
    private int systemSeq;
    private int processSeq;
    private String processName;
    private String eventSeq;
    private String alarmName;
    private String severity;
    private int repeatCount;
    private String useFlag;
    private String smsFlag;
    private long conditionCount;
}
