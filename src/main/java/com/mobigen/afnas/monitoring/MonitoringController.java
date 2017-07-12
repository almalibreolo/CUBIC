package com.mobigen.afnas.monitoring;

import com.mobigen.afnas.monitoring.model.*;
import com.mobigen.framework.result.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by lyj on 2017-03-16.
 */
@Controller
@RequestMapping("/monitoring")
public class MonitoringController {

	@Autowired
	MonitoringService monitoringService;

	/**
	 * CmSystemProcess 조회
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getCmSystemProcess.json")
	@ResponseBody
	public JsonResult getCmSystemProcess() throws Exception {

		JsonResult js = new JsonResult();
		List<CmSystemProcessModel> list = monitoringService.getCmSystemProcess();
		js.setData(list);

		return js;
	}

	/**
	 * HmKafkaserverTopicStatus 조회
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getHmKafkaserverTopicStatus.json")
	@ResponseBody
	public JsonResult getHmKafkaserverTopicStatus() throws Exception {

		JsonResult js = new JsonResult();
		List<HmKafkaserverTopicStatusModel> list = monitoringService.getHmKafkaserverTopicStatus();
		js.setData(list);

		return js;
	}

	/**
	 * HmUiRequestHistory Count 조회
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getHmUiRequestHistoryCount.json")
	@ResponseBody
	public JsonResult getHmUiRequestHistoryCount() throws Exception {

		JsonResult js = new JsonResult();
		int data = monitoringService.getHmUiRequestHistoryCount();
		js.setData(data);

		return js;
	}

	/**
	 * DB DiskUsage 조회
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getDBDiskUsage.json")
	@ResponseBody
	public JsonResult getDBDiskUsage() throws Exception {

		JsonResult js = new JsonResult();
		long data = monitoringService.getDBDiskUsage();
		js.setData(data);

		return js;
	}

	/**
	 * DB List 조회
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getDBList.json")
	@ResponseBody
	public JsonResult getDBList() throws Exception {

		JsonResult js = new JsonResult();
		List<DBListModel> list = monitoringService.getDBList();
		js.setData(list);

		return js;
	}

	/**
	 * SixHour KafkaData 조회
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getSixHourKafkaData.json")
	@ResponseBody
	public JsonResult getSixHourKafkaData() throws Exception {

		JsonResult js = new JsonResult();
		List<HmKafkaserverMetricsModel> list = monitoringService.getSixHourKafkaData();
		js.setData(list);

		return js;
	}

	/**
	 * SixHour SystemData 조회
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getSixHourSystemData.json")
	@ResponseBody
	public JsonResult getSixHourSystemData() throws Exception {

		JsonResult js = new JsonResult();
		List<HmSystemCpuModel> list = monitoringService.getSixHourSystemData();
		js.setData(list);

		return js;
	}

	/**
	 * SixHour MemoryData 조회
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getSixHourMemoryData.json")
	@ResponseBody
	public JsonResult getSixHourMemoryData() throws Exception {

		JsonResult js = new JsonResult();
		List<HmSystemMemoryModel> list = monitoringService.getSixHourMemoryData();
		js.setData(list);

		return js;
	}

	/**
	 * SixHour NetworkData 조회
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getSixHourNetworkData.json")
	@ResponseBody
	public JsonResult getSixHourNetworkData() throws Exception {

		JsonResult js = new JsonResult();
		List<HmSystemMemoryModel> list = monitoringService.getSixHourNetworkData();
		js.setData(list);

		return js;
	}

	/**
	 * SixHour DiskData 조회
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getSixHourDiskData.json")
	@ResponseBody
	public JsonResult getSixHourDiskData() throws Exception {

		JsonResult js = new JsonResult();
		List<HmSystemDiskfreeModel> list = monitoringService.getSixHourDiskData();
		js.setData(list);

		return js;
	}
}
