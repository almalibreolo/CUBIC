package com.mobigen.afnas.monitoring;

import com.mobigen.afnas.monitoring.model.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by lyj on 2017-03-16.
 */
@Repository("monitoringMapper")
public interface MonitoringMapper {

	/**
	 * CmSystemProcess 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<CmSystemProcessModel> getCmSystemProcess() throws Exception;

	/**
	 * HmKafkaserverTopicStatus 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<HmKafkaserverTopicStatusModel> getHmKafkaserverTopicStatus() throws Exception;

	/**
	 * HmUiRequestHistory Count 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public int getHmUiRequestHistoryCount() throws Exception;

	/**
	 * DB DiskUsage 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public long getDBDiskUsage() throws Exception;

	/**
	 * DB List 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<DBListModel> getDBList() throws Exception;

	/**
	 * SixHour KafkaData 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<HmKafkaserverMetricsModel> getSixHourKafkaData() throws Exception;

	/**
	 * SixHour SystemData 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<HmSystemCpuModel> getSixHourSystemData() throws Exception;

	/**
	 * SixHour MemroyData 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<HmSystemMemoryModel> getSixHourMemoryData() throws Exception;

	/**
	 * SixHour NetworkData 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<HmSystemMemoryModel> getSixHourNetworkData() throws Exception;

	/**
	 * SixHour DiskData 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<HmSystemDiskfreeModel> getSixHourDiskData() throws Exception;
}
