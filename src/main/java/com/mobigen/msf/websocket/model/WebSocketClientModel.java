package com.mobigen.msf.websocket.model;

import org.springframework.web.socket.WebSocketSession;

import lombok.Data;

@Data
public class WebSocketClientModel {
    private WebSocketSession session;
    private int isClose = 0;
}
