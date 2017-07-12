package com.mobigen.msf.websocket;

import java.util.HashMap;
import java.util.Map;

import org.springframework.scheduling.annotation.Async;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mobigen.msf.websocket.model.WebSocketClientModel;
import com.mobigen.msf.websocket.model.WebSocketDataModel;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class WebSocketEndPoint extends TextWebSocketHandler {

    Map<String, WebSocketClientModel> sessions = new HashMap<String, WebSocketClientModel>();;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);

        WebSocketClientModel client = new WebSocketClientModel();
        client.setSession(session);
        sessions.put(session.getId(), client);

        sendMessage(client);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status)
            throws Exception {
        super.afterConnectionClosed(session, status);

        WebSocketClientModel client = sessions.get(session.getId());
        client.setIsClose(1);
        sessions.remove(session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message)
            throws Exception {
        super.handleTextMessage(session, message);
    }

    @Async
    private void sendMessage(WebSocketClientModel client) {
        try {
            String key = client.getSession().getId();

            while (true) {
                if (client.getIsClose() == 1) {
                    break;
                }

                TextMessage msg = new TextMessage("START");
                client.getSession().sendMessage(msg);
                
                msg = new TextMessage(getMessage(key));
                client.getSession().sendMessage(msg);
                log.debug("WEB SOCKET (Send Message)" + " " + key + " " + msg.getPayload());
                
                msg = new TextMessage("END");
                client.getSession().sendMessage(msg);
                
                Thread.sleep(100);
            }
        } catch (Exception e) {
            log.error("Async Send Message Error", e);
        }
    }
    
    private String getMessage(String key) {
        WebSocketDataModel m = new WebSocketDataModel();
        m.setKey(key);
        
        ObjectMapper mapper = new ObjectMapper();
        String result = "";
        
        try {
            result = mapper.writeValueAsString(m);
        } catch (Exception e) {
            log.error("Json Convert Error", e);
        }
        
        return result;
    }
}
