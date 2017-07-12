package com.mobigen.afnas.alarm.model;

import lombok.Data;

import java.util.List;

/**
 * Created by lyj on 2016-08-24.
 */
@Data
public class EventHistoryResultModel {
	int count;
	int cr;
	int mj;
	int mi;
	List<EventHistoryModel> list;
}
