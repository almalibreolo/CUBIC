package com.mobigen.afnas.common;

import com.mobigen.afnas.common.model.AlarmManagerModel;
import com.mobigen.afnas.common.model.RequestModel;
import com.mobigen.afnas.common.model.HostModel;
import com.mobigen.afnas.common.model.ServiceModel;
import com.mobigen.framework.result.JsonResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lyj on 2017-03-02.
 */
@Controller
@RequestMapping("/common")
@Slf4j
public class CommonController {

	@Autowired
	private CommonService commonService;

	/**
	 * ZookeeperManagerImpl test
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/setAlarmManagerData.do")
	@ResponseBody
	public JsonResult setAlarmManagerData(@ModelAttribute AlarmManagerModel model) throws Exception {

		JsonResult js = new JsonResult();
		boolean result = commonService.setAlarmManagerData(model);
		js.setData(result);

		return js;
	}


	/**
	 * hm_ui_request_history 조회
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getRequestHistory.json")
	@ResponseBody
	public JsonResult getRequestHistory(@RequestBody RequestModel model) throws Exception {

		JsonResult js = new JsonResult();
		List<RequestModel> list = commonService.getRequestHistory();
		js.setData(list);

		return js;
	}

	/**
	 * 전체 Status 조회
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getAllStatusList.json")
	@ResponseBody
	public JsonResult getAllStatusList() throws Exception {

		JsonResult js = new JsonResult();
		Map<String, Object> result = new HashMap<String, Object>();
		List<ServiceModel> statusServiceList = commonService.getStatusServiceList(null);
		result.put("statusServiceList", statusServiceList);
		List<ServiceModel> statusVolumeList = commonService.getStatusVolumeList(null);
		result.put("statusVolumeList", statusVolumeList);
		List<HostModel> statusHostList = commonService.getSysStatusUsageConfig();
		result.put("statusHostList", statusHostList);
		js.setData(result);

		return js;
	}

}
