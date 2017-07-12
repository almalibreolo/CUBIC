package com.mobigen.afnas.alarm;

import com.mobigen.afnas.alarm.model.EventConfigModel;
import com.mobigen.afnas.alarm.model.EventHistoryModel;
import com.mobigen.afnas.alarm.model.EventHistoryParamModel;
import com.mobigen.afnas.alarm.model.EventHistoryResultModel;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Created by lyj on 2016-12-21.
 */
@Repository("alarmMapper")
public interface AlarmMapper {

    /**
     * cm_event_config 조회
     *
     * @return
     * @throws Exception
     */
    public List<EventConfigModel> getEventConfigList() throws Exception;

    /**
     * cm_event_config 선택 조회
     *
     * @return
     * @throws Exception
     */
    public List<EventConfigModel> getEventConfig(EventConfigModel model) throws Exception;

    /**
     * cm_event_config update
     *
     * @return
     * @throws Exception
     */
    public int updateEventConfig(EventConfigModel model) throws Exception;

    /**
     * fm_event_history 조회
     *
     * @return
     * @throws Exception
     */
    public List<EventHistoryModel> getAlarmList(EventHistoryParamModel model) throws Exception;

    public EventHistoryResultModel getAlarmCount(EventHistoryParamModel model) throws Exception;


    /**
     * Resolved time 조회
     *
     * @return
     * @throws Exception
     */
    public String getResolvedTime(EventHistoryParamModel model) throws Exception;

}
