package com.mobigen.afnas.common;

import com.mobigen.common.zookeeper.ZookeeperManagerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;

import java.util.Locale;

/**
 * Created by lyj on 2017-02-06.
 */
public class AlarmManager {

	@Autowired
	MessageSource messageSource;

	private ZookeeperManagerImpl manager;

	public void initialize() {
		String connectionString = messageSource.getMessage("url.alarmManager", null, Locale.getDefault());;
		manager = new ZookeeperManagerImpl(connectionString);
	}

	public void setData(Object object) {
		manager.setData("/test", "collect",  object);
	}
}
