package com.mobigen.afnas.common;

import com.mobigen.afnas.common.model.RequestModel;
import com.mobigen.afnas.common.model.HostModel;
import com.mobigen.afnas.common.model.ServiceModel;
import com.mobigen.afnas.dashboard.model.ServiceRequestModel;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by lyj on 2017-03-03.
 */
@Repository("commonMapper")
public interface CommonMapper {

	public List<RequestModel> getRequestHistory() throws Exception;

	public int setRequestHistory(RequestModel model) throws Exception;

	/**
	 * Dashboard Service Status 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<ServiceModel> getStatusServiceList(ServiceRequestModel model) throws Exception;

	/**
	 * Dashboard Volume Status 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<ServiceModel> getStatusVolumeList(ServiceRequestModel model) throws Exception;

	/**
	 * Dashboard Host Status 조회
	 *
	 * @return
	 * @throws Exception
	 */
	public List<HostModel> getSysStatusUsageConfig() throws Exception;

}
