package com.mobigen.afnas.alarm;

import com.mobigen.afnas.common.AlarmManager;
import com.mobigen.framework.service.excel.ExcelService;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.prefs.CsvPreference;
import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;
import com.mobigen.afnas.alarm.model.EventConfigModel;
import com.mobigen.afnas.alarm.model.EventHistoryParamModel;
import com.mobigen.afnas.alarm.model.EventHistoryResultModel;
import com.mobigen.framework.result.JsonResult;
import com.mobigen.framework.service.excel.model.ExcelRequest;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lyj on 2016-12-21.
 */
@Controller
@RequestMapping("/alarm")
public class AlarmController {

    @Autowired
    AlarmService alarmService;

    @Autowired
    private ExcelService excelService;

    @Autowired
    private AlarmManager alarmManager;

    /**
     * cm_event_config 조회
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/getEventConfigList.json")
    @ResponseBody
    public JsonResult getEventConfigList() throws Exception {

        JsonResult js = new JsonResult();
        List<EventConfigModel> list = alarmService.getEventConfigList();
        js.setData(list);

        return js;
    }

    /**
     * cm_event_config 선택 조회
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/getEventConfig.json")
    @ResponseBody
    public JsonResult getEventConfig(@RequestBody EventConfigModel model) throws Exception {

        JsonResult js = new JsonResult();
        List<EventConfigModel> list = alarmService.getEventConfig(model);
        js.setData(list);

        return js;
    }


    /**
     * cm_event_config update
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/updateEventConfig.json")
    @ResponseBody
    public JsonResult updateEventConfig(@RequestBody EventConfigModel model) throws Exception {
        JsonResult js = new JsonResult();

        List<EventConfigModel> list = alarmService.getEventConfig(model);
        if(list.isEmpty() == false || list.size() != 0)
            throw new Exception("This alarm severity is already registered.");
        else
           js.setData(alarmService.updateEventConfig(model));

        return js;
    }

    /**
     * fm_event_history 등급별 count
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/getAlarmCount.json")
    @ResponseBody
    public JsonResult getAlarmCount(@RequestBody EventHistoryParamModel model) throws Exception {

        JsonResult js = new JsonResult();
        EventHistoryResultModel result = alarmService.getAlarmCount(model);
        js.setData(result);

        return js;
    }

    /**
     * fm_event_history 조회
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/getAlarmList.json")
    @ResponseBody
    public JsonResult getAlarmList(@RequestBody EventHistoryParamModel model) throws Exception {

        JsonResult js = new JsonResult();
        EventHistoryResultModel result = alarmService.getAlarmList(model);
        js.setData(result);

        return js;
    }


    /**
     * Resolved time 조회
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/getResolvedTime.json")
    @ResponseBody
    public JsonResult getResolvedTime(@RequestBody EventHistoryParamModel model) throws Exception {

        JsonResult js = new JsonResult();
        String result = alarmService.getResolvedTime(model);
        js.setData(result);

        return js;
    }

    /**
     * @param request
     * @param response
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
    @RequestMapping(value = "/excelDownloadHssf.json")
    public void excelDownloadHSSF(HttpServletRequest request, HttpServletResponse response) throws Exception {

        String param = "";
        if(request.getParameter("param") != null){
            param = request.getParameter("param");
        }

        String fileType = "";
        if(request.getParameter("fileType") != null){
            fileType = request.getParameter("fileType");
        }

        //param 에서 model 추출
        JsonReader reader = new JsonReader(new StringReader(param));
        reader.setLenient(true);

        Gson gson = new Gson();
        EventHistoryParamModel alarmFilterModel = gson.fromJson(reader, EventHistoryParamModel.class);
        /*if(fileType.equals("csv")){
            alarmFilterModel.setLimit(10000);  // csv 한계
        }else{
            alarmFilterModel.setLimit(10000);  // excel 한계
        }*/

        // excel data
        /*Object excelData = alarmService.getAlarmList(alarmFilterModel);

        Object objJson1 = new Gson().toJson(excelData);
        AlarmAnalysisModel eventAnalysis = new Gson().fromJson(objJson1.toString(), AlarmAnalysisModel.class);*/
        EventHistoryResultModel eventAnalysis = alarmService.getAlarmList(alarmFilterModel);

        List<? extends Object> excelDataList = eventAnalysis.getList();
        List<Object> excelDataObjList = (List<Object>) excelDataList;

        String startInString = alarmFilterModel.getSdate();
        String sTimeString = convertDateType(startInString);

        String endInString = alarmFilterModel.getEdate();
        String eTimeString = convertDateType(endInString);

        ExcelRequest excelRequest = new ExcelRequest();
        excelRequest.setFileName("Alarm_List_"+ sTimeString +"_"+ eTimeString );

        // Excel Header
        String[] headerName = {"Alarm Code", "Alarm Name", "Severity", "Resource", "Location", "Occur Date", "Ack Date", "Release Date"};
        String[] fieldName = {"alarmCode", "alarmName", "severity", "resource", "location", "occurDate", "ackDate", "releaseDate"};
        String[] dataType = {"string", "string", "string", "string", "string", "string", "string", "string"};

        List<Map<String, String>> headers = new ArrayList<Map<String, String>>();
        headers = makeExcelHeader(headers, headerName, fieldName, dataType);
        excelRequest.setHeaders(headers);

        // Header CSV
        String[] headerCSV = { "alarmCode", "alarmName", "severity", "resource", "location", "occurDate", "ackDate", "releaseDate" };

        makeHSSFExcelCSV(request, response, excelRequest, excelDataObjList, fileType, headerCSV);
    }

    /**
     * DateType을 변경해준다. yyyy-MM-dd HH:mm:ss -> yyyyMMddHHmmss
     *
     * @param time
     * @return
     */
    public String convertDateType(String time){
        String date = null;

        if(time != null && time != "" && time.length() == 19){
            String yyyy = time.substring(0,4);
            String MM = time.substring(5,7);
            String dd = time.substring(8,10);
            String HH = time.substring(11,13);
            String mm = time.substring(14,16);
            String ss = time.substring(17,19);

            date = yyyy+MM+dd+HH+mm+ss;
        }else{
            date = time;
        }

        return date;
    }

    /**
     * HSSFWorkbook
     *
     * @param request
     * @param response
     * @param excelRequest
     * @param excelDataObjList
     * @param fileType
     * @param headerCSV
     * @throws Exception
     */
    public void makeHSSFExcelCSV(HttpServletRequest request, HttpServletResponse response, ExcelRequest excelRequest, List<Object> excelDataObjList, String fileType, String[] headerCSV) throws Exception{

        if(fileType == null){
            fileType = "excel";
        }

        String strClient = request.getHeader("User-Agent");
        if (strClient.indexOf("MSIE 5.5") > -1) {
            response.setHeader("Content-Disposition", "filename=" + excelRequest.getFileName() + ";");
        } else if(fileType.equals("csv")){
            response.setContentType("text/csv");
            response.setHeader("Content-Disposition", "attachment; filename=" + excelRequest.getFileName() +".csv"+ ";");

            ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);

            //String str = excelRequest.getTitle();
            //csvWriter.writeHeader(str);
            csvWriter.writeHeader(headerCSV);

            for (Object object : excelDataObjList) {
                csvWriter.write(object, headerCSV);
            }

            if (csvWriter != null){
                csvWriter.close();
            }

        } else{

            // XLS Writing
            HSSFWorkbook hswk = null;
            ServletOutputStream out = null;

            hswk = excelService.makeExcelDataHSSF(excelRequest, excelDataObjList);
            response.reset();

            response.setContentType("application/vnd.ms-excel");
            response.setHeader("Content-Disposition", "attachment; filename=" + excelRequest.getFileName() +".xls"+";");

            out = response.getOutputStream();
            hswk.write(out);

            if (hswk != null){
                hswk.close();
            }

            if (out != null){
                out.close();
            }
        }
    }

    /**
     * Excel Header 정보를 생성해준다.
     * headerName, fileName, dataType 정보의 개수를 일치시켜준다.
     *
     * headerName 은 실제 엑셀에서 보여지는 컬럼명
     * fieldName 은 쿼리구문의 컬럼명 한글이나, 중간공백 사용불가
     *
     * @param headers
     * @param headerName
     * @param fieldName
     * @param dataType
     */
    public List<Map<String, String>> makeExcelHeader(List<Map<String, String>> headers, String[] headerName, String[] fieldName, String[] dataType){

        if(headers != null){
            if(headerName != null && fieldName != null && dataType != null){
                Map<String, String> header = null;
                for(int i=0; i < headerName.length; i++){
                    header = new HashMap<String, String>();
                    header.put("headerName", headerName[i]);
                    header.put("fieldName", fieldName[i]);
                    header.put("dataType", dataType[i]);

                    headers.add(header);
                }
            }
        }
        return headers;
    }

    /**
     * ZookeeperManagerImpl test
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/setAlarmManagerData.do")
    @ResponseBody
    public void setAlarmManagerData() throws Exception {
        alarmManager.initialize();
        Map<String, String> map = new HashMap<String, String>();
        map.put("type", "alarm");
        map.put("msg", "change");
        alarmManager.setData(map);
    }

}

