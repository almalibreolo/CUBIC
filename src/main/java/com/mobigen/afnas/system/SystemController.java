package com.mobigen.afnas.system;

import com.mobigen.afnas.dashboard.DashboardService;
import com.mobigen.afnas.dashboard.model.*;
import com.mobigen.framework.result.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lyj on 2016-12-08.
 */
@Controller
@RequestMapping("/system")
public class SystemController {

    @Autowired
    SystemService systemService;


    /**
     * afnas_sm_collect_time 조회
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/getAfnasSmCollectTime.json")
    @ResponseBody
    public JsonResult getAfnasSmCollectTime() throws Exception {

        JsonResult js = new JsonResult();
        List<Map<String, String>> list = systemService.getAfnasSmCollectTime();
        js.setData(list);

        return js;
    }

    /**
     * afnas_sm_process 조회
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/getAfnasSmProcess.json")
    @ResponseBody
    public JsonResult getAfnasSmProcess() throws Exception {

        JsonResult js = new JsonResult();
        List<Map<String, String>> list = systemService.getAfnasSmProcess();
        js.setData(list);

        return js;
    }

    /**
     * afnas_sm_process_topic_info 조회
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/getAfnasSmProcessTopicInfo.json")
    @ResponseBody
    public JsonResult getAfnasSmProcessTopicInfo() throws Exception {

        JsonResult js = new JsonResult();
        List<Map<String, String>> list = systemService.getAfnasSmProcessTopicInfo();
        js.setData(list);

        return js;
    }

    /**
     * afnas_sm_server 조회
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/getAfnasSmServer.json")
    @ResponseBody
    public JsonResult getAfnasSmServer() throws Exception {

        JsonResult js = new JsonResult();
        List<Map<String, String>> list = systemService.getAfnasSmServer();
        js.setData(list);

        return js;
    }

    /**
     * afnas_sm_server_check_info 조회
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/getAfnasSmServerCheckInfo.json")
    @ResponseBody
    public JsonResult getAfnasSmServerCheckInfo() throws Exception {

        JsonResult js = new JsonResult();
        List<Map<String, String>> list = systemService.getAfnasSmServerCheckInfo();
        js.setData(list);

        return js;
    }
}
