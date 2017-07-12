package com.mobigen.afnas.common;

import com.google.gson.Gson;
import com.mobigen.afnas.common.model.AlarmManagerModel;
import com.mobigen.afnas.common.model.RequestModel;
import com.mobigen.afnas.common.model.HostModel;
import com.mobigen.afnas.common.model.ServiceModel;
import com.mobigen.afnas.dashboard.model.ServiceRequestModel;
import com.mobigen.framework.annotation.transactional.WriteTransactional;
import com.mobigen.framework.result.JsonResult;
import com.mobigen.framework.security.SessionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by lyj on 2017-03-02.
 */
@Service
public class CommonService {

	@Autowired
	private CommonMapper commonMapper;

	@Autowired
	private AlarmManager alarmManager;

	@Autowired
	private SessionManager sessionManager;


	/**
	 * ZookeeperManagerImpl test
	 * @param model
	 * @return
	 * @throws Exception
	 */
	public boolean setAlarmManagerData(AlarmManagerModel model) throws Exception {
		try {
			alarmManager.initialize();
//			Map<String, String> map = new HashMap<String, String>();
//			map.put("type", "alarm");
//			map.put("msg", "change");
			alarmManager.setData(model);
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	/**
	 * hm_ui_request_history 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<RequestModel> getRequestHistory() throws Exception {
		List<RequestModel> result = commonMapper.getRequestHistory();
		return result;
	}

	/**
	 * hm_ui_request_history 추가
	 *
	 * @return
	 * @throws Exception
	 */
	@WriteTransactional
	public int setRequestHistory(String url, Object param) throws Exception {

		if (url == null) {
			return JsonResult.RESULT_FAIL;
		}

		RequestModel model = new RequestModel();
		model.setRequestUser(sessionManager.getUsername());
		if (param == null) {
			model.setRequestData(url);
		} else  {
			url += "_";

			Gson gson = new Gson();
			String str = gson.toJson(param);
			model.setRequestData(url.concat(str));
		}

		commonMapper.setRequestHistory(model);

		return JsonResult.RESULT_SUCCESS;
	}

	/**
	 * Service Status 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<ServiceModel> getStatusServiceList(ServiceRequestModel model) throws Exception {
		List<ServiceModel> result = commonMapper.getStatusServiceList(model);
		return result;
	}

	/**
	 * Volumne Status 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<ServiceModel> getStatusVolumeList(ServiceRequestModel model) throws Exception {
		List<ServiceModel> result = commonMapper.getStatusVolumeList(model);
		return result;
	}

	/**
	 * Host Status 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<HostModel> getSysStatusUsageConfig() throws Exception {
		List<HostModel> result = commonMapper.getSysStatusUsageConfig();
		return result;
	}

}
