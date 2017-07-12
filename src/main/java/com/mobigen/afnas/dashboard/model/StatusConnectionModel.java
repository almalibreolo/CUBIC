package com.mobigen.afnas.dashboard.model;

import lombok.Data;

@Data
public class StatusConnectionModel {
    
    String maxConnectionCount;
    String currentConnectionCount;
    String serviceName;

}
