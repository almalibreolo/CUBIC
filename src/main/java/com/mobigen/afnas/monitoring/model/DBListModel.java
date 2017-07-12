package com.mobigen.afnas.monitoring.model;

import lombok.Data;

/**
 * Created by lyj on 2017-04-03.
 */
@Data
public class DBListModel {
	private String tableName;
	private String tableRows;
	private String dataSizeMB;
	private String indexSizeMB;
	private String dataSize;
	private String indexSize;
}
