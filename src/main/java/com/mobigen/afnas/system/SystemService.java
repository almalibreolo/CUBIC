package com.mobigen.afnas.system;

import com.mobigen.afnas.dashboard.model.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by lyj on 2016-12-08.
 */
@Slf4j
@Service
public class SystemService {

    @Autowired
    private SystemMapper systemMapper;


    /**
     * afnas_sm_collect_time 조회
     *
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> getAfnasSmCollectTime() throws Exception {
        List<Map<String, String>> result = systemMapper.getAfnasSmCollectTime();
        return result;
    }

    /**
     * afnas_sm_process 조회
     *
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> getAfnasSmProcess() throws Exception {
        List<Map<String, String>> result = systemMapper.getAfnasSmProcess();
        return result;
    }

    /**
     * afnas_sm_process_topic_info 조회
     *
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> getAfnasSmProcessTopicInfo() throws Exception {
        List<Map<String, String>> result = systemMapper.getAfnasSmProcessTopicInfo();
        return result;
    }

    /**
     * afnas_sm_server 조회
     *
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> getAfnasSmServer() throws Exception {
        List<Map<String, String>> result = systemMapper.getAfnasSmServer();
        return result;
    }

    /**
     * afnas_sm_server_check_info 조회
     *
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> getAfnasSmServerCheckInfo() throws Exception {
        List<Map<String, String>> result = systemMapper.getAfnasSmServerCheckInfo();
        return result;
    }

}
