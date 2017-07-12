<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

	<section ng-controller="DashboardCtrl as dashboardCtrl">

		<div class="mu-row">
			<!-- Status -->
			<div class="mu-col mu-col-status">

				<div class="mu-panel">
					<div class="mu-panel-head">
						<span class="mu-title">Status 
						<!-- <a href="" class="mu-icon question" tooltips tooltip-side="right" tooltip-size="medium" tooltip-template="{{'HELP.DASHBOARD.STATUS' | translate}}"></a>-->
						</span>
						<div class="mu-item-group fr">
							<button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only" ng-click="dashboardCtrl.setPolling()"><i class="mu-icon" ng-class="dashboardCtrl.isPolling() ? 'pause' : 'play'"></i></button>
							<button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only" ng-click="dashboardCtrl.refreshType = 1"><i class="mu-icon repeat"></i></button>
							<span class="update">Last Update <strong dashboard-time="dashboardCtrl.refreshType"></strong></span>
						</div>
					</div>
					<div class="mu-panel-body">
						<div class="status-wrap">
							<ul>
								<li class="stat-service">
									<dl>
										<dt>
											<span class="mu-title">Service</span>
											<i class="mu-iocn-img"></i>
										</dt>
										<dd>
											<div class="normal">
												<span class="title">Normal</span>
												<span class="num">{{dashboardCtrl.statusService.normalCount}}</span>
											</div>
											<div class="abnormal">
												<span class="title">Abnormal</span>
												<span class="num">{{dashboardCtrl.statusService.abnormalCount}}</span>
											</div>
										</dd>
									</dl>
								</li>
								<li class="stat-volume">
									<dl>
										<dt>
											<span class="mu-title">Volume</span>
											<i class="mu-iocn-img"></i>
										</dt>
										<dd>
											<div class="normal">
												<span class="title">Normal</span>
												<span class="num">{{dashboardCtrl.statusVolume.normalCount}}</span>
											</div>
											<div class="abnormal">
												<span class="title">Abnormal</span>
												<span class="num">{{dashboardCtrl.statusVolume.abnormalCount}}</span>
											</div>
										</dd>
									</dl>
								</li>
								<li class="stat-host">
									<dl>
										<dt>
											<span class="mu-title">Node</span>
											<i class="mu-iocn-img"></i>
										</dt>
										<dd>
											<div class="normal">
												<span class="title">Normal</span>
												<span class="num">{{dashboardCtrl.statusHost.normalCount}}</span>
											</div>
											<div class="abnormal">
												<span class="title">Abnormal</span>
												<span class="num">{{dashboardCtrl.statusHost.abnormalCount}}</span>
											</div>
										</dd>
									</dl>
								</li>
							</ul>
						</div>
						<div class="info-wrap">
							<ul>
								<li class="info-size">
									<dl>
										<dt>
											<span class="mu-title">Size</span>
											<i class="mu-iocn-img"></i>
										</dt>
										<dd>
											<div class="mu-progress">
												<div class="mu-pbar current" ng-style="dashboardCtrl.statusSizeStyle">
													<span class="c-num">{{dashboardCtrl.statusSizeCurrent | byteFormat}}</span>
													<span>Current</span>
												</div>
												<div class="mu-pbar max" ng-style="dashboardCtrl.statusSizeMaxStyle">
													<span>Max</span>
												</div>
												<div class="mu-pbar total" style="width:100%">
													<span class="t-num">{{dashboardCtrl.statusSizeTotal | byteFormat}}</span>
													<%--<span class="unit">GB</span>--%>
													<span>Total</span>
												</div>
											</div>
										</dd>
									</dl>
								</li>
								<li class="info-connection">
									<dl>
										<dt>
											<span class="mu-title">Connection</span>
											<i class="mu-iocn-img"></i>
										</dt>
										<dd>
											<div class="mu-progress">
												<div class="mu-pbar current" ng-style="dashboardCtrl.statusConnectionStyle">
													<span class="c-num">{{dashboardCtrl.statusConnectionCurrent}}</span>
													<span>Current</span>
												</div>
												<div class="mu-pbar total" style="width:100%">
													<span class="t-num">{{dashboardCtrl.statusConnectionMax}}</span>
													<span>Max</span>
												</div>
											</div>
										</dd>
									</dl>
								</li>
								<li class="info-throughtput">
									<dl>
										<dt>
											<span class="mu-title">Throughtput</span>
											<i class="mu-iocn-img"></i>
										</dt>
										<dd>
											<div class="mu-progress">
												<div class="mu-pbar current" ng-style="dashboardCtrl.statusThroughtputStyle">
													<span class="c-num">{{dashboardCtrl.statusThroughtputCurrent}}</span>
													<span>Current</span>
												</div>
												<div class="mu-pbar total" style="width:100%">
													<span class="t-num">{{dashboardCtrl.statusThroughtputMax}}</span>
													<%--<span class="unit">MB/s</span>--%>
													<span>Max</span>
												</div>
											</div>
										</dd>
									</dl>
								</li>
							</ul>
						</div>
					</div>
				</div>

			</div>
			<!-- //Status -->
		</div>

		<div class="mu-row">
			<!-- Service -->
			<div class="mu-col mu-col-service mu-splitter-wrap vertical">
				<div class="mu-panel mu-panel-service mu-splitter-first">
					<div class="mu-panel-head">
						<span class="mu-title">Service 
						<!--<a href="" class="mu-icon question" tooltips tooltip-side="right" tooltip-size="medium" tooltip-template="{{'HELP.DASHBOARD.SERVICE' | translate}}"></a>  --></span>
						<div class="mu-item-group fr">
							<div class="mu-btn-group">
								<button type="button" class="mu-btn" ng-class="(dashboardCtrl.viewType == 'severity')? 'active':''" ng-click="dashboardCtrl.changeViewType('severity')" <%--ng-disabled="dashboardCtrl.viewType == 'grid'"--%> title="severity">Severity</button>
								<button type="button" class="mu-btn" ng-class="(dashboardCtrl.viewType == 'usage')? 'active':''" ng-click="dashboardCtrl.changeViewType('usage')" <%--ng-disabled="dashboardCtrl.viewType == 'grid'"--%> title="usage">Usage</button>
							</div>
							<button type="button" class="mu-btn mu-btn-icon mu-btn-bg-non">
								<%--<i class="mu-icon" ng-class="(dashboardCtrl.viewType == 'grid')? 'disk':'grid'" ng-click="dashboardCtrl.changeViewType((dashboardCtrl.viewType != 'grid')? 'grid':'severity')" title="table"></i>--%>
								<i class="mu-icon grid" ng-show="dashboardCtrl.viewType != 'grid'" ng-click="dashboardCtrl.changeViewType((dashboardCtrl.viewType != 'grid')? 'grid':'severity')" title="Table view"></i>
								<i class="mu-icon disk" ng-show="dashboardCtrl.viewType == 'grid'" ng-click="dashboardCtrl.changeViewType((dashboardCtrl.viewType != 'grid')? 'grid':'severity')" title="Diagram view"></i>
							</button>
						</div>
					</div>
					<%--tile--%>
					<div class="mu-panel-body" ng-show="(dashboardCtrl.viewType != 'grid')? true:false">
						<div class="service-wrap mu-scroll-v">

							<div ng-repeat="service in dashboardCtrl.statusServiceList track by $index" class="service-box" ng-class="[service.alarmSeverity, (service.checked == true ? 'active' : ''), (service.clicked == true ? 'focus' : '')]" ng-click="dashboardCtrl.clickService($event, service)" title="{{service.serviceName}}" >
							<%--<div class="service-box critical"><!-- critical -->--%>
								<div class="mu-title" ng-show="(dashboardCtrl.viewType == 'severity' && service.alarmTitle)? true:false">{{service.alarmTitle}}</div><!-- 상태별 첫번째에 타이틀 추가 -->
								<%--<div class="mu-title">Critical</div><!-- 상태별 첫번째에 타이틀 추가 -->--%>
								<div class="service-stat"></div>
								<div class="service-info">
									<span class="mu-title">{{service.serviceName}}<br>{{service.serviceType}} / {{service.capacityPercent | floatFormat:1}}%</span>
									<button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only btn-share" ng-click="dashboardCtrl.clickServiceDetail($event, service)" title="{{service.serviceName}} 상세보기">
										<i class="mu-icon search-plus"></i>
									</button>
								</div>
							</div>

						</div>
					</div>
					<%--/tile--%>
					<%--list--%>
					<div class="mu-panel-body" ng-show="(dashboardCtrl.viewType == 'grid')? true:false">
						<div class="grid-area">
							<%--<div id="ui-grid" ui-grid="gridCtrl.gridOptions" ui-grid-auto-resize></div>--%>
							<div id="ui-grid" ui-grid="dashboardCtrl.gridOptions" ui-grid-selection style="width: 975px; height: 352px; "></div>
						</div>
					</div>
					<%--list--%>
				</div>

				<div class="mu-splitter left"></div>

				<!-- Alarm -->
				<div class="mu-panel mu-panel-alarm mu-splitter-last">
					<div class="mu-panel-head">
						<span class="mu-title">Alarm 
						<!--<a href="" class="mu-icon question" tooltips tooltip-side="right" tooltip-size="medium" tooltip-template="{{'HELP.DASHBOARD.ALARM' | translate}}"></a>--></span>
					</div>
					<current-alarm selected-filter="dashboardCtrl.alarmFilter" clicked-filter="dashboardCtrl.clickedAlarm" class="mu-panel-body" style="height: 100%; width: 100%"></current-alarm>
				</div>
				<!-- //Alarm -->

			</div>
			<!-- //Service -->

			<!-- Volume -->
			<div class="mu-col mu-col-volume">

				<div class="mu-panel">
					<div class="mu-panel-head">
						<span class="mu-title">Volume 
						<!-- <a href="" class="mu-icon question" tooltips tooltip-side="right" tooltip-size="medium" tooltip-template="{{'HELP.DASHBOARD.VOLUME' | translate}}"></a> --></span>
					</div>
					<div class="mu-panel-body">
						<div class="volume-wrap mu-scroll-v">
							<div ng-repeat="volume in dashboardCtrl.statusVolumeList track by $index" class="disk-box" ng-class="[volume.alarmSeverity, (volume.checked == true ? 'active' : ''), (volume.clicked == true ? 'focus' : '')]" ng-click="dashboardCtrl.clickVolume($event, volume)" title="{{volume.volumeName}}" ><!-- normal -->
								<div class="disk-set">
									<span ng-repeat="n in volume.unusedList track by $index"></span>
									<span class="used" ng-repeat="n in volume.usedList track by $index"></span>
								</div>
								<div class="disk-info">
									<span class="mu-title">{{volume.volumeName}}</span>
									<button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only btn-share" ng-click="dashboardCtrl.clickVolumeDetail($event, volume)"><i class="mu-icon search-plus"></i></button>
								</div>
							</div>

						</div>
					</div>
				</div>

			</div>
			<!-- //Volume -->

			<!-- Host -->
			<div class="mu-col mu-col-host mu-splitter-last">

				<div class="mu-panel">
					<div class="mu-panel-head">
						<span class="mu-title">Node
						<!--<a href="" class="mu-icon question" tooltips tooltip-side="right" tooltip-size="medium" tooltip-template="{{'HELP.DASHBOARD.NODE' | translate}}"></a></span>-->
					</div>
					<div class="mu-panel-body mu-splitter-wrap vertical">
						<div class="host-wrap mu-scroll-v mu-splitter-first">
							<ul>
								<li ng-repeat="host in dashboardCtrl.statusHostList track by $index" ng-class="[(host.checked == true ? 'active' : ''), (host.clicked == true ? 'focus' : '')]" ng-click="dashboardCtrl.clickHost($event, host)" title="{{host.hostName}}">
									<span class="stat" ng-class="host.alarmSeverity"></span>
									<span class="mu-title">{{host.hostName}}</span>
								</li>
							</ul>
						</div>
									
						<div class="mu-splitter right"></div>
									
						<div class="host-info mu-splitter-last">
							<div class="host-list mu-scroll-v"></div>
							<div class="host-content mu-scroll-v"></div>
						</div>
					</div>
				</div>

			</div>
			<!-- //Host -->
		</div>
	</section>