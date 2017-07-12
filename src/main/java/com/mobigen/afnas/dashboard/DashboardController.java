package com.mobigen.afnas.dashboard;

import com.mobigen.afnas.common.model.ServiceModel;
import com.mobigen.afnas.dashboard.model.*;
import com.mobigen.framework.result.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lyj on 2016-11-03.
 */
@Controller
@RequestMapping("/dashboard")
public class DashboardController {

	@Autowired
	DashboardService dashboardService;


	/**
	 * 전체 서비스 조회
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getAllServiceList.json")
	@ResponseBody
	public JsonResult getAllServiceList() throws Exception {

		JsonResult js = new JsonResult();
		Map<String, Object> result = new HashMap<String, Object>();

        /* 2017/07/07 UI에서 사용하지 않으므로 일단 주석 */
//    List<CmSystemInfoModel> cmSystemInfoList = dashboardService.getCmSystemInfoList();
//    result.put("cmSystemInfo", cmSystemInfoList);
		List<AfnasInfoServiceModel> afnasInfoServiceList = dashboardService.getAfnasInfoServiceList();
		result.put("afnasInfoService", afnasInfoServiceList);
		List<GfInfoVolumeModel> gfInfoVolumeList = dashboardService.getGfInfoVolumeList();
		result.put("gfInfoVolume", gfInfoVolumeList);
		List<GfInfoVolnhostModel> gfInfoVolnhostList = dashboardService.getGfInfoVolnhostList();
		result.put("gfInfoVolnhost", gfInfoVolnhostList);
		js.setData(result);

		return js;
	}

	/**
	 * 서비스 정보 조회
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getService.json")
	@ResponseBody
	public JsonResult getService(@RequestBody ServiceRequestModel model) throws Exception {

		JsonResult js = new JsonResult();
		List<ServiceModel> list = dashboardService.getService(model);
		js.setData(list);

		return js;
	}

	/**
	 * 서비스 상태 정보 조회
	 *
	 * @return
	 * @throws Exception
	 */
	/*@RequestMapping(value = "/getStatusServiceList.json")
    @ResponseBody
    public JsonResult getStatusServiceList(@RequestBody ServiceRequestModel model) throws Exception {

        JsonResult js = new JsonResult();
        List<ServiceModel> list = dashboardService.getStatusServiceList(model);
        js.setData(list);

        return js;
    }*/

	/**
	 * 볼륨 상태 정보 조회
	 *
	 * @return
	 * @throws Exception
	 */
    /*@RequestMapping(value = "/getStatusVolumeList.json")
    @ResponseBody
    public JsonResult getStatusVolumeList(@RequestBody ServiceRequestModel model) throws Exception {

        JsonResult js = new JsonResult();
        List<ServiceModel> list = dashboardService.getStatusVolumeList(model);
        js.setData(list);

        return js;
    }*/

	/**
	 * 서비스 Size 조회
	 *
	 * @return
	 * @throws Exception
	 */
    /*@RequestMapping(value = "/getVolumnSize.json")
    @ResponseBody
    public JsonResult getVolumnSize(@RequestBody Map model) throws Exception {

        JsonResult js = new JsonResult();
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("type", "Size");
        List<ServiceChartModel> list = dashboardService.getVolumnSize(model);
        result.put("list", list);
        List<ServiceChartModel> list_total = dashboardService.getVolumnSizeTotal(model);
        result.put("count", list_total);
        js.setData(result);

        return js;
    }*/

	/**
	 * 서비스 Size 주간 데이타 조회
	 *
	 * @return
	 * @throws Exception
	 */
    /*@RequestMapping(value = "/getServiceSizeWeek.json")
    @ResponseBody
    public JsonResult getServiceSizeWeek(@RequestBody Map model) throws Exception {

        JsonResult js = new JsonResult();
        List<ServiceChartModel> list = dashboardService.getServiceSizeWeek(model);
        js.setData(list);

        return js;
    }*/

	/**
	 * 서비스 Connection 조회
	 *
	 * @return
	 * @throws Exception
	 */
    /*@RequestMapping(value = "/getServiceConnection.json")
    @ResponseBody
    public JsonResult getServiceConnection(@RequestBody Map model) throws Exception {

        JsonResult js = new JsonResult();
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("type", "Connection");
        List<ServiceChartModel> list = dashboardService.getServiceConnection(model);
        result.put("list", list);
        List<ServiceChartModel> list_total = dashboardService.getServiceConnectionTotal(model);
        result.put("count", list_total);
        js.setData(result);

        return js;
    }*/

	/**
	 * 서비스 Connection 주간 데이타 조회
	 *
	 * @return
	 * @throws Exception
	 */
    /*@RequestMapping(value = "/getServiceConnectionWeek.json")
    @ResponseBody
    public JsonResult getServiceConnectionWeek(@RequestBody Map model) throws Exception {

        JsonResult js = new JsonResult();
        List<ServiceChartModel> list = dashboardService.getServiceConnectionWeek(model);
        js.setData(list);

        return js;
    }*/


	/**
	 * Status 해당 전체 조회
	 *
	 * @return
	 * @throws Exception
	 */
    /*@RequestMapping(value = "/getAllStatus.json")
    @ResponseBody
    public JsonResult getAllStatus() throws Exception {

        JsonResult js = new JsonResult();
        Map<String, Object> result = new HashMap<String, Object>();
        StatusModel statusService = dashboardService.getStatusService();
        result.put("statusService", statusService);

        StatusModel statusVolume = dashboardService.getStatusVolume();
        result.put("statusVolume", statusVolume);

        StatusModel statusHost = dashboardService.getStatusHost();
        result.put("statusHost", statusHost);

        StatusServiceModel StatusCapacity = dashboardService.getStatusCapacity();
        result.put("StatusCapacity", StatusCapacity);

        StatusServiceModel StatusMaxCapacity = dashboardService.getStatusMaxCapacity();
        result.put("StatusMaxCapacity", StatusMaxCapacity);

        StatusServiceModel statusCurrentConnection = dashboardService.getStatusSvcConnection();
        result.put("statusCurrentConnection", statusCurrentConnection);

        StatusServiceModel statusMaxConnection = dashboardService.getStatusSvcConnectionMax();
        result.put("statusMaxConnection", statusMaxConnection);


        StatusServiceModel connectionPercent = dashboardService.calculationConnectionPercent();
        result.put("connectionPercent", connectionPercent);

        StatusServiceModel capacityPercent = dashboardService.calculationCapacityPercent();
        result.put("capacityPercent", capacityPercent);


        js.setData(result);
        return js;


    }*/


	/**
	 * 선택한 서비스 상세 정보 조회
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getSelectServiceDetail.json")
	@ResponseBody
	public JsonResult getSelectServiceDetail(@RequestBody ServiceRequestModel service, HttpServletRequest request, HttpServletResponse response) throws Exception {

		Map<String, Object> result = new HashMap<String, Object>();

		List<ServiceDetailModel> selectServiceDetail = dashboardService.getSelectServiceDetail(service);
//        result.put("selectServiceDetail", selectServiceDetail);

//        List<ServiceDetailAlarmModel> selectServiceAlarmDetail = dashboardService.getSelectServiceAlarmDetail(service);
//        result.put("selectServiceAlarmDetail", selectServiceAlarmDetail);

		JsonResult js = new JsonResult();
		js.setData(selectServiceDetail);

		return js;
	}

	/**
	 * 선택한 호스트 상세 정보 조회
	 *
	 * @return
	 * @throws Exception
	 */
    /*@RequestMapping(value = "/getSelectHostDetail.json")
    @ResponseBody
    public JsonResult getSelectHostDetail(@RequestBody Map model) throws Exception {

        JsonResult js = new JsonResult();
        List<HostModel>  result = dashboardService.getSelectHostDetail(model);
        js.setData(result);

        return js;
    }*/


	/**
	 * alarm status 조회
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getAlarmStatus.json")
	@ResponseBody
	public JsonResult getAlarmStatus() throws Exception {

		JsonResult js = new JsonResult();
		AlarmStatusModel result = dashboardService.getAlarmStatus();
		js.setData(result);

		return js;
	}

	/**
	 * cluster status 조회
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getStatusCluster.json")
	@ResponseBody
	public JsonResult getStatusCluster() throws Exception {

		JsonResult js = new JsonResult();
		StatusClusterModel result = dashboardService.getStatusCluster();

		long maxCapacity = dashboardService.getStatusClusterCapacityMax();
		result.setMaxCapacity(maxCapacity);
		int maxConnections = dashboardService.getStatusClusterConnectionMax();
		result.setMaxConnections(maxConnections);

		js.setData(result);

		return js;
	}

	/**
	 * alarm highest status 조회
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getHighestAlarmStatus.json")
	@ResponseBody
	public JsonResult getHighestAlarmStatus() throws Exception {

		JsonResult js = new JsonResult();
		List<HighestAlarmStatusModel> list = dashboardService.getHighestAlarmStatus();
		js.setData(list);

		return js;
	}

}
