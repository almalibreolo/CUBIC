package com.mobigen.afnas.system;

import com.mobigen.afnas.dashboard.model.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Created by lyj on 2016-12-08.
 */
@Repository("systemMapper")
public interface SystemMapper {

    /**
     * afnas_sm_collect_time 조회
     *
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> getAfnasSmCollectTime() throws Exception;

    /**
     * afnas_sm_process 조회
     *
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> getAfnasSmProcess() throws Exception;

    /**
     * afnas_sm_process_topic_info 조회
     *
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> getAfnasSmProcessTopicInfo() throws Exception;

    /**
     * afnas_sm_server 조회
     *
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> getAfnasSmServer() throws Exception;

    /**
     * afnas_sm_server_check_info 조회
     *
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> getAfnasSmServerCheckInfo() throws Exception;
}
