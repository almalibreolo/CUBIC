package com.mobigen.afnas.dashboard;

import java.util.List;

import com.mobigen.afnas.common.model.HostModel;
import com.mobigen.afnas.common.model.ServiceModel;
import com.mobigen.afnas.dashboard.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

/**
 * Created by lyj on 2016-11-03.
 */
@Slf4j
@Service
public class DashboardService {

    @Autowired
    private DashboardMapper dashboardMapper;

    /**
     * AfnasInfoService List 조회
     * 
     * @return
     * @throws Exception
     */
    public List<AfnasInfoServiceModel> getAfnasInfoServiceList() throws Exception {
        List<AfnasInfoServiceModel> result = dashboardMapper.getAfnasInfoServiceList();
        return result;
    }

    /**
     * GfInfoVolume List 조회
     * 
     * @return
     * @throws Exception
     */
    public List<GfInfoVolumeModel> getGfInfoVolumeList() throws Exception {
        List<GfInfoVolumeModel> result = dashboardMapper.getGfInfoVolumeList();
        return result;
    }

    /**
     * GfInfoVolnhost List 조회
     * 
     * @return
     * @throws Exception
     */
    public List<GfInfoVolnhostModel> getGfInfoVolnhostList() throws Exception {
        List<GfInfoVolnhostModel> result = dashboardMapper.getGfInfoVolnhostList();
        return result;
    }

    /**
     * Service 조회
     * 
     * @return
     * @throws Exception
     */
    public List<ServiceModel> getService(ServiceRequestModel model) throws Exception {
        List<ServiceModel> result = dashboardMapper.getService(model);
        return result;
    }

    /**
     * Service Status 조회
     *
     * @return
     * @throws Exception
     */
    /*public List<ServiceModel> getStatusServiceList(ServiceRequestModel model) throws Exception {
        List<ServiceModel> result = dashboardMapper.getStatusServiceList(model);
        return result;
    }*/

    /**
     * Volumne Status 조회
     *
     * @return
     * @throws Exception
     */
    /*public List<ServiceModel> getStatusVolumeList(ServiceRequestModel model) throws Exception {
        List<ServiceModel> result = dashboardMapper.getStatusVolumeList(model);
        return result;
    }*/

    /**
     * Host Status 조회
     *
     * @return
     * @throws Exception
     */
    /*public List<HostModel> getSysStatusUsageConfig() throws Exception {
        List<HostModel> result = dashboardMapper.getSysStatusUsageConfig();
        return result;
    }*/

    /**
     * Service Size 조회
     * 
     * @return
     * @throws Exception
     */
    /*public List<ServiceChartModel> getVolumnSize(Map model) throws Exception {
        List<ServiceChartModel> result = dashboardMapper.getVolumnSize(model);
        return result;
    }*/

    /**
     * Service Size Total 조회
     *
     * @return
     * @throws Exception
     */
    /*public List<ServiceChartModel> getVolumnSizeTotal(Map model) throws Exception {
        List<ServiceChartModel> result = dashboardMapper.getVolumnSizeTotal(model);
        return result;
    }*/

    /**
     * Service Size 주간 데이타 조회
     * 
     * @return
     * @throws Exception
     */
    /*public List<ServiceChartModel> getServiceSizeWeek(Map model) throws Exception {
        List<ServiceChartModel> result = dashboardMapper.getServiceSizeWeek(model);
        return result;
    }*/

    /**
     * Service Connection 조회
     * 
     * @return
     * @throws Exception
     */
    /*public List<ServiceChartModel> getServiceConnection(Map model) throws Exception {
        List<ServiceChartModel> result = dashboardMapper.getServiceConnection(model);
        return result;
    }*/

    /**
     * Service Connection Total 조회
     * 
     * @return
     * @throws Exception
     */
    /*public List<ServiceChartModel> getServiceConnectionTotal(Map model) throws Exception {
        List<ServiceChartModel> result = dashboardMapper.getServiceConnectionTotal(model);
        return result;
    }*/

    /**
     * Service Connection 주간 데이타 조회
     * 
     * @return
     * @throws Exception
     */
    /*public List<ServiceChartModel> getServiceConnectionWeek(Map model) throws Exception {
        List<ServiceChartModel> result = dashboardMapper.getServiceConnectionWeek(model);
        return result;
    }*/



    /**
     * 특정 Service 상세 조회
     * 
     * @return
     * @throws Exception
     */
    public List<ServiceDetailModel> getSelectServiceDetail(ServiceRequestModel service) throws Exception {
        List<ServiceDetailModel> result = dashboardMapper.getSelectServiceDetail(service);
        return result;
    }

    /**
     * 특정 Host 상세 조회
     *
     * @return
     * @throws Exception
     */
    /*public List<HostModel> getSelectHostDetail(Map service) throws Exception {
        List<HostModel> result = dashboardMapper.getSelectHostDetail(service);
        return result;
    }*/
    
    /**
     * 특정 Service alarm 상세 조회
     * 
     * @return
     * @throws Exception
     */
    /*public List<ServiceDetailAlarmModel> getSelectServiceAlarmDetail(ServiceRequestModel service)
            throws Exception {
        List<ServiceDetailAlarmModel> result = dashboardMapper.getSelectServiceAlarmDetail(service);
        return result;

    }*/


    /**
     * Service status 조회
     * 
     * @return
     * @throws Exception
     */
    /*public StatusModel getStatusService() throws Exception {
        StatusModel result = dashboardMapper.getStatusService();
        result.setNormalCount(calculationCount(result.getNormalCount()));
        result.setAbnormalCount(calculationCount(result.getAbnormalCount()));
        return result;
    }*/

    /**
     * Volume status 조회
     * 
     * @return
     * @throws Exception
     */
    /*public StatusModel getStatusVolume() throws Exception {
        StatusModel result = dashboardMapper.getStatusVolume();
        result.setNormalCount(calculationCount(result.getNormalCount()));
        result.setAbnormalCount(calculationCount(result.getAbnormalCount()));
        return result;
    }*/

    /**
     * Host status 조회
     * 
     * @return
     * @throws Exception
     */
    /*public StatusModel getStatusHost() throws Exception {
        StatusModel result = dashboardMapper.getStatusHost();
        result.setNormalCount(calculationCount(result.getNormalCount()));
        result.setAbnormalCount(calculationCount(result.getAbnormalCount()));
        return result;
    }*/

    /**
     * Capacity status 조회
     * 
     * @return
     * @throws Exception
     */
    /*public StatusServiceModel getStatusCapacity() throws Exception {
        StatusServiceModel result = dashboardMapper.getStatusCapacity();
        result.setCurrentUnit(calculationCapacity(result.getCurrentUnit()));
        result.setTotalUnit(calculationCapacity(result.getTotalUnit()));
        return result;
    }*/

    /**
     * 한시간 동안 Max Capacity status 조회
     * 
     * @return
     * @throws Exception
     */
    /*public StatusServiceModel getStatusMaxCapacity() throws Exception {
        StatusServiceModel result = dashboardMapper.getStatusMaxCapacity();
        result.setMaxUnit(calculationCapacity(result.getMaxUnit()));
        return result;
    }*/

    /**
     * Gluster의 connection조회
     * 
     * @return
     * @throws Exception
     */
    /*public StatusServiceModel getStatusGlusterConnection() throws Exception {
        StatusServiceModel result = dashboardMapper.getStatusGlusterConnection();
        result.setCurrentUnit(calculationCount(result.getCurrentUnit()));
        return result;
    }*/

    /**
     * Gluster의 한 시간 동안 Max connection 조회
     * 
     * @return
     * @throws Exception
     */
    /*public StatusServiceModel getStatusGlusterMaxConnection() throws Exception {
        StatusServiceModel result = dashboardMapper.getStatusGlusterMaxConnection();
        result.setMaxUnit(calculationCount(result.getMaxUnit()));
        return result;
    }*/

    /**
     * Samba의 connection 조회
     * 
     * @return
     * @throws Exception
     */
    /*public StatusServiceModel getStatusSambaConnection() throws Exception {
        StatusServiceModel result = dashboardMapper.getStatusSambaConnection();
        result.setCurrentUnit(calculationCount(result.getCurrentUnit()));
        return result;
    }*/


    /**
     * Samba의 한 시간 동안 Max connection 조회
     * 
     * @return
     * @throws Exception
     */
    /*public StatusServiceModel getStatusSambaMaxConnection() throws Exception {
        StatusServiceModel result = dashboardMapper.getStatusSambaMaxConnection();
        result.setMaxUnit(calculationCount(result.getMaxUnit()));
        return result;
    }*/

    /*public StatusServiceModel getStatusConnection() throws Exception {
        StatusServiceModel result = new StatusServiceModel();

        StatusServiceModel gluster = dashboardMapper.getStatusGlusterConnection();
        StatusServiceModel samba = dashboardMapper.getStatusSambaConnection();

        long glusterConnection = Long.parseLong(gluster.getCurrentUnit());
        long sambaConnection = Long.parseLong(samba.getCurrentUnit());
        long currentConnection = glusterConnection + sambaConnection;
        result.setCurrentUnit(calculationCount(currentConnection + ""));

        return result;
    }*/

    /*public StatusServiceModel getStatusMaxConnection() throws Exception {
        StatusServiceModel result = new StatusServiceModel();

        StatusServiceModel samba = dashboardMapper.getStatusSambaMaxConnection();
        StatusServiceModel gluster = dashboardMapper.getStatusGlusterMaxConnection();

        long maxConnection = 0;
        long glusterConnection = Long.parseLong(gluster.getMaxUnit());
        long sambaConnection = Long.parseLong(samba.getMaxUnit());

        if (glusterConnection >= sambaConnection) {
            maxConnection = glusterConnection;
            result.setMaxUnit(calculationCount(maxConnection + ""));
        } else {
            maxConnection = sambaConnection;
            result.setMaxUnit(calculationCount(maxConnection + ""));
        }

        return result;
    }*/

    /*public StatusServiceModel getStatusSvcConnection() throws Exception {
        StatusServiceModel result = new StatusServiceModel();

        StatusServiceModel model = dashboardMapper.getStatusConnection();
        long currentConnection = Long.parseLong(model.getCurrentUnit());

        result.setCurrentUnit(calculationCount(currentConnection + ""));

        return result;
    }*/

    /*public StatusServiceModel getStatusSvcConnectionMax() throws Exception {
        StatusServiceModel result = new StatusServiceModel();

        StatusServiceModel model = dashboardMapper.getStatusMaxConnection();
        long connection = Long.parseLong(model.getMaxUnit());
        result.setMaxUnit(calculationCount(connection + ""));

        return result;
    }*/

    /**
     * 용량에 비율을 계산해준다.
     * 
     * @return result 변환된 값
     * @throws Exception
     */
    /*public StatusServiceModel calculationCapacityPercent() throws Exception {
        StatusServiceModel percent = new StatusServiceModel();
        StatusServiceModel result1 = dashboardMapper.getStatusCapacity();
        StatusServiceModel result2 = dashboardMapper.getStatusMaxCapacity();

        double currentCapacity = Double.parseDouble(result1.getCurrentUnit());
        double totalCapacity = Double.parseDouble(result1.getTotalUnit());
        double maxCapacity = Double.parseDouble(result2.getMaxUnit());
        int currentPercent = 0;
        int maxPercent = 0;
        if (totalCapacity != 0) {
            currentPercent = (int) Math.round(currentCapacity / totalCapacity * 100);
            maxPercent = (int) Math.round(maxCapacity / totalCapacity * 100);


            percent.setCurrentUnit(currentPercent + "%");
            percent.setMaxUnit(maxPercent + "%");
            percent.setTotalUnit("100%");
        } else {

            percent.setCurrentUnit("0%");
            percent.setMaxUnit("0%");
            percent.setTotalUnit("0%");
        }

        return percent;
    }*/



    /**
     * connection count 에 비율을 계산해준다.
     * 
     * @return result 변환된 값
     * @throws Exception
     */
    /*public StatusServiceModel calculationConnectionPercent() throws Exception {
        StatusServiceModel percent = new StatusServiceModel();
        StatusServiceModel current = dashboardMapper.getStatusConnection();
        StatusServiceModel max = dashboardMapper.getStatusMaxConnection();
        double currentCapacity = Double.parseDouble(current.getCurrentUnit());
        double maxCapacity = Double.parseDouble(max.getMaxUnit());

        if (maxCapacity != 0) {
            long currentPercent = Math.round(currentCapacity / maxCapacity * 100);
            percent.setCurrentUnit(currentPercent + "%");
            percent.setMaxUnit("100%");
        } else {
            percent.setCurrentUnit("0%");
            percent.setMaxUnit("0%");

        }

        return percent;
    }*/


    /**
     * alarm status 조회
     *
     * @return
     * @throws Exception
     */
    public AlarmStatusModel getAlarmStatus() throws Exception {
        AlarmStatusModel result = dashboardMapper.getAlarmStatus();
        return result;
    }

    /**
     * cluster status 조회
     *
     * @return
     * @throws Exception
     */
    public StatusClusterModel getStatusCluster() throws Exception {
        StatusClusterModel result = dashboardMapper.getStatusCluster();
        return result;
    }

	public long getStatusClusterCapacityMax() throws Exception {
		long result = dashboardMapper.getStatusClusterCapacityMax();
		return result;
	}

    public int getStatusClusterConnectionMax() throws Exception {
        int result = dashboardMapper.getStatusClusterConnectionMax();
        return result;
    }

    /**
     * alarm highest status 조회
     *
     * @return
     * @throws Exception
     */
    public List<HighestAlarmStatusModel> getHighestAlarmStatus() throws Exception {
        List<HighestAlarmStatusModel> result = dashboardMapper.getHighestAlarmStatus();
        return result;
    }


    /**
     * 용량을 계산해 알맞은 단위가 포함된 용량을 반환
     *
     * @return result 변환된 값
     * @throws Exception
     */
    private String calculationCapacity(String capacity) throws Exception {
        String result = null;
        String unit[] = {"KB", "MB", "GB", "TB", "PB", "EB", "ZB"};
        long longCapacity = Long.parseLong(capacity);
        int e = (int) Math.floor(Math.log(longCapacity) / Math.log(1024));

        // 소수점 첫째짜리까지 반올림
        double calCapacity;
        calCapacity = Math.round(longCapacity / Math.pow(1024, e) * 10) / 10.0;
        result = calCapacity + unit[e - 1];
        return result;
    }

    /**
     * 수량을 계산해 알맞은 단위의 포함된 수량을 반환
     *
     * @return result 변환된 값
     * @throws Exception
     */
    private String calculationCount(String count) throws Exception {

        String result = count;
        String unit[] = {"K", "M", "G", "T"};
        long longCount = Long.parseLong(count);
        double calCapacity;
        int CapacityLength = count.length();
        for (int i = CapacityLength - 1; i >= 0; i--) {
            double size = Math.pow(10, (i + 1) * 3);
            if (size <= longCount) {
                calCapacity = Math.round((longCount / size) * 10) / 10.0;
                if ((longCount == 1000) && (i < unit.length - 1)) {
                    calCapacity = 1;
                    i++;
                }
                result = calCapacity + unit[i];
                break;
            }
        }

        return result;
    }

}
