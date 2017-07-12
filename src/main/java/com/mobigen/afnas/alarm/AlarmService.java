package com.mobigen.afnas.alarm;

import com.mobigen.afnas.alarm.model.EventConfigModel;
import com.mobigen.afnas.alarm.model.EventHistoryModel;
import com.mobigen.afnas.alarm.model.EventHistoryParamModel;
import com.mobigen.afnas.alarm.model.EventHistoryResultModel;
import com.mobigen.framework.annotation.transactional.WriteTransactional;
import com.mobigen.framework.result.JsonResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;

/**
 * Created by lyj on 2016-12-21.
 */
@Slf4j
@Service
public class AlarmService {

    @Autowired
    private AlarmMapper alarmMapper;


    /**
     * cm_event_config 조회
     *
     * @return
     * @throws Exception
     */
    public List<EventConfigModel> getEventConfigList() throws Exception {
        List<EventConfigModel> result = alarmMapper.getEventConfigList();
        return result;
    }

    /**
     * cm_event_config 선택 조회
     *
     * @return
     * @throws Exception
     */
    public List<EventConfigModel> getEventConfig(EventConfigModel model) throws Exception {
        List<EventConfigModel> result = alarmMapper.getEventConfig(model);
        return result;
    }

    /**
     * cm_event_config update
     *
     * @return
     * @throws Exception
     */
    @WriteTransactional
    public int updateEventConfig(EventConfigModel model) throws Exception {
        if (model == null) {
            return JsonResult.RESULT_FAIL;
        }

        alarmMapper.updateEventConfig(model);

        return JsonResult.RESULT_SUCCESS;
    }

    /**
     * fm_event_history 등급별 counnt
     *
     * @return
     * @throws Exception
     */
    public EventHistoryResultModel getAlarmCount(EventHistoryParamModel model) throws Exception {
        EventHistoryResultModel result = new EventHistoryResultModel();
        result = alarmMapper.getAlarmCount(model);
        return result;
    }

    /**
     * fm_event_history 조회
     *
     * @return
     * @throws Exception
     */
    public EventHistoryResultModel getAlarmList(EventHistoryParamModel model) throws Exception {
        EventHistoryResultModel result = new EventHistoryResultModel();
        result = alarmMapper.getAlarmCount(model);
        result.setList(alarmMapper.getAlarmList(model));
        return result;
    }


    /**
     * Resolved time 조회
     *
     * @return
     * @throws Exception
     */
    public String getResolvedTime(EventHistoryParamModel model) throws Exception {
 
        String result = alarmMapper.getResolvedTime(model);
        return result;
    }





}
