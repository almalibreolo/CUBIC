package com.mobigen.msf.websocket.model;

import lombok.Data;

@Data
public class WebSocketDataModel {
    private int num;
    private String key;
    private double value1 = Math.random() * 10000;
    private double value2 = Math.random() * 10000;
    private double value3 = Math.random() * 10000;
    private double value4 = Math.random() * 10000;
}