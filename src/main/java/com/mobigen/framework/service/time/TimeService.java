package com.mobigen.framework.service.time;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;

import org.springframework.stereotype.Service;


@Service
public class TimeService {

	public String getServerTime() throws Exception {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime date = LocalDateTime.now();
		return date.format(formatter);
	}

	public long getTimeOffset(String clientDatetime) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime clientDate = LocalDateTime.parse(clientDatetime, formatter);

		long offset = Instant.now().toEpochMilli() - getTime(clientDate);
		return offset;
	}
	
	private long getTime(LocalDateTime lt) {
		return lt.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
	}

}
