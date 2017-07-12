package com.mobigen.afnas.monitoring;

import com.mobigen.afnas.monitoring.model.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by lyj on 2017-03-16.
 */
@Slf4j
@Service
public class MonitoringService {

	@Autowired
	private MonitoringMapper monitoringMapper;

	/**
	 * CmSystemProcess 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<CmSystemProcessModel> getCmSystemProcess() throws Exception {
		List<CmSystemProcessModel> result = monitoringMapper.getCmSystemProcess();
		return result;
	}

	/**
	 * HmKafkaserverTopicStatus 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<HmKafkaserverTopicStatusModel> getHmKafkaserverTopicStatus() throws Exception {
		List<HmKafkaserverTopicStatusModel> result = monitoringMapper.getHmKafkaserverTopicStatus();
		return result;
	}

	/**
	 * HmUiRequestHistory Count 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public int getHmUiRequestHistoryCount() throws Exception {
		int result = monitoringMapper.getHmUiRequestHistoryCount();
		return result;
	}

	/**
	 * DB DiskUsage 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public long getDBDiskUsage() throws Exception {
		long result = monitoringMapper.getDBDiskUsage();
		return result;
	}

	/**
	 * DB List 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<DBListModel> getDBList() throws Exception {
		List<DBListModel> result = monitoringMapper.getDBList();
		return result;
	}

	/**
	 * SixHour KafkaData 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<HmKafkaserverMetricsModel> getSixHourKafkaData() throws Exception {
		List<HmKafkaserverMetricsModel> result = monitoringMapper.getSixHourKafkaData();
		return result;
	}

	/**
	 * SixHour SystemData 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<HmSystemCpuModel> getSixHourSystemData() throws Exception {
		List<HmSystemCpuModel> result = monitoringMapper.getSixHourSystemData();
		return result;
	}

	/**
	 * SixHour MomoryData 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<HmSystemMemoryModel> getSixHourMemoryData() throws Exception {
		List<HmSystemMemoryModel> result = monitoringMapper.getSixHourMemoryData();
		return result;
	}

	/**
	 * SixHour NetworkData 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<HmSystemMemoryModel> getSixHourNetworkData() throws Exception {
		List<HmSystemMemoryModel> result = monitoringMapper.getSixHourNetworkData();
		return result;
	}

	/**
	 * SixHour DiskData 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<HmSystemDiskfreeModel> getSixHourDiskData() throws Exception {
		List<HmSystemDiskfreeModel> result = monitoringMapper.getSixHourDiskData();
		return result;
	}
}
