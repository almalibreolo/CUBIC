package com.mobigen.afnas.dashboard;

import java.util.List;

import com.mobigen.afnas.common.model.HostModel;
import com.mobigen.afnas.common.model.ServiceModel;
import com.mobigen.afnas.dashboard.model.*;
import org.springframework.stereotype.Repository;

/**
 * Created by lyj on 2016-11-03.
 */
@Repository("dashboardMapper")
public interface DashboardMapper {

    /**
     * Dashboard AfnasInfoService List 조회
     * 
     * @return
     * @throws Exception
     */
    public List<AfnasInfoServiceModel> getAfnasInfoServiceList() throws Exception;

    /**
     * Dashboard GfInfoVolume List 조회
     * 
     * @return
     * @throws Exception
     */
    public List<GfInfoVolumeModel> getGfInfoVolumeList() throws Exception;

    /**
     * Dashboard GfInfoVolnhost List 조회
     * 
     * @return
     * @throws Exception
     */
    public List<GfInfoVolnhostModel> getGfInfoVolnhostList() throws Exception;

    /**
     * Dashboard Service 조회
     * 
     * @return
     * @throws Exception
     */
    public List<ServiceModel> getService(ServiceRequestModel model) throws Exception;

    /**
     * Dashboard Service Status 조회
     *
     * @return
     * @throws Exception
     */
//    public List<ServiceModel> getStatusServiceList(ServiceRequestModel model) throws Exception;

    /**
     * Dashboard Volume Status 조회
     *
     * @return
     * @throws Exception
     */
//    public List<ServiceModel> getStatusVolumeList(ServiceRequestModel model) throws Exception;

    /**
     * Dashboard Host Status 조회
     *
     * @return
     * @throws Exception
     */
//    public List<HostModel> getSysStatusUsageConfig() throws Exception;

    /**
     * Dashboard Service Size 조회
     * 
     * @return
     * @throws Exception
     */
//    public List<ServiceChartModel> getVolumnSize(Map model) throws Exception;

//    public List<ServiceChartModel> getVolumnSizeTotal(Map model) throws Exception;

    /**
     * Dashboard Service Size 주간 데이타 조회
     * 
     * @return
     * @throws Exception
     */
//    public List<ServiceChartModel> getServiceSizeWeek(Map model) throws Exception;

    /**
     * Dashboard Service Connection 조회
     * 
     * @return
     * @throws Exception
     */
//    public List<ServiceChartModel> getServiceConnection(Map model) throws Exception;

//    public List<ServiceChartModel> getServiceConnectionTotal(Map model) throws Exception;

    /**
     * Dashboard Service Connection 주간 데이타 조회
     * 
     * @return
     * @throws Exception
     */
//    public List<ServiceChartModel> getServiceConnectionWeek(Map model) throws Exception;

    /**
     * Dashboard Service Status 조회
     * 
     * @return
     * @throws Exception
     */
//    public StatusModel getStatusService() throws Exception;


    /**
     * Dashboard Volume Status 조회
     * 
     * @return
     * @throws Exception
     */
//    public StatusModel getStatusVolume() throws Exception;

    /**
     * Dashboard Host Status 조회
     * 
     * @return
     * @throws Exception
     */
//    public StatusModel getStatusHost() throws Exception;

    /**
     * Dashboard Capacity Status 조회
     * 
     * @return
     * @throws Exception
     */
//    public StatusServiceModel getStatusCapacity() throws Exception;

//    public StatusServiceModel getStatusMaxCapacity() throws Exception;

    /**
     * Dashboard Gluster Connection Status 조회
     * 
     * @return
     * @throws Exception
     */
//    public StatusServiceModel getStatusGlusterConnection() throws Exception;

//    public StatusServiceModel getStatusGlusterMaxConnection() throws Exception;

    /**
     * Dashboard Samba Connection Status 조회
     * 
     * @return
     * @throws Exception
     */
//    public StatusServiceModel getStatusSambaConnection() throws Exception;

//    public StatusServiceModel getStatusSambaMaxConnection() throws Exception;

    /**
     * Dashboard 전체 Connection Status 조회
     *
     * @return
     * @throws Exception
     */
//    public StatusServiceModel getStatusConnection() throws Exception;

//    public StatusServiceModel getStatusMaxConnection() throws Exception;
    
    /**
     * Dashboard 특정 Service 상세 조회
     * 
     * @return
     * @throws Exception
     */
    public List<ServiceDetailModel> getSelectServiceDetail(ServiceRequestModel service) throws Exception;

    /**
     * Dashboard 특정 Host 상세 조회
     *
     * @return
     * @throws Exception
     */
//    public List<HostModel> getSelectHostDetail(Map service) throws Exception;

//    public List<ServiceDetailAlarmModel> getSelectServiceAlarmDetail (ServiceRequestModel service) throws Exception;

    /**
     * alarm status 조회
     *
     * @return
     * @throws Exception
     */
    public AlarmStatusModel getAlarmStatus() throws Exception;

    /**
     * cluster status 조회
     *
     * @return
     * @throws Exception
     */
    public StatusClusterModel getStatusCluster() throws Exception;
	public long getStatusClusterCapacityMax() throws Exception;
    public int getStatusClusterConnectionMax() throws Exception;


    /**
     * alarm highest status 조회
     *
     * @return
     * @throws Exception
     */
    public List<HighestAlarmStatusModel> getHighestAlarmStatus() throws Exception;
}
