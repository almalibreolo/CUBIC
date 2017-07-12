<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<section ng-controller="monitoringCtrl as ctrl">
	<div class="mu-row mu-row-monitoring">
		<!-- Service -->
		<div class="mu-col mu-col-overview">

			<div class="mu-panel">
				<div class="mu-panel-head">
					<span class="mu-title">Overview</span>
					<div class="mu-item-group fr">
						<button type="button" class="mu-btn mu-btn-icon mu-btn-bg-non"><i class="mu-icon list"></i></button>
						<div class="mu-tooltip bottom">
							<div class="arrow"></div>
							<ul class="mu-list">
								<li>
									<div class="mu-radio">
										<input type="radio" id="r0" name="overview" checked="checked" ng-click="ctrl.changeOverviewSortType('process')">
										<label for="r0"><i class="mu-icon sort-asc"></i>Process</label>
									</div>
								</li>
								<li>
									<div class="mu-radio">
										<input type="radio" id="r1" name="overview" ng-click="ctrl.changeOverviewSortType('system')">
										<label for="r1"><i class="mu-icon sort-asc"></i>System</label>
									</div>
								</li>
							</ul>
						</div>
						<button type="button" class="mu-btn mu-btn-icon mu-btn-bg-non"><i class="mu-icon search"></i></button>
					</div>
				</div>
				<div class="mu-panel-body">
					<div class="overview-wrap">
						<div class="mu-item-group">
							<input type="text" class="mu-input" placeholder="search..." ng-model="search">
							<button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only" ng-click="ctrl.clickOverviewSearch()"><i class="mu-icon search"></i></button>
						</div>
						<div class="mu-scroll-v">
							<dl ng-repeat="system in ctrl.overviewList track by $index">
								<dt>{{system.name}}</dt>
								<dd>
									<ul>
										<li ng-repeat="data in system.data | filter:search">{{ctrl.overviewSortType == 'process' ? data.systemName: data.processName}}<span ng-class="data.processStatus == 'Alive' ? 'alive': 'dead'">{{data.processStatus}} ({{data.runningTime}})</span></li>
									</ul>
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>

		</div>
		<!-- //Service -->

		<!-- Volume -->
		<div class="mu-col">
			<div class="mu-row mu-row-batch">
				<div class="mu-col">

					<div class="mu-panel">
						<div class="mu-panel-head">
							<span class="mu-title">Last Batch Time</span>
						</div>
						<div class="mu-panel-body">
							<div class="batch-wrap">
								<span class="mu-tooltip events">{{ctrl.countKafkaEvents | numFormat}}</span>
								<span class="mu-tooltip metrics">{{ctrl.countMariaDBMetrics | numFormat}}</span>
								<span class="mu-tooltip logs">{{ctrl.countElasticLogs | numFormat}}</span>
								<span class="mu-tooltip alarms">{{ctrl.countAlarms | numFormat}}</span>
								<span class="mu-tooltip connections">{{ctrl.countRequests | numFormat}}</span>
								<span class="mu-badge metric" ng-show="ctrl.errorCollectd">{{ctrl.errorCollectd}}</span>
								<span class="mu-badge log" ng-show="ctrl.errorFilebeat">{{ctrl.errorFilebeat}}</span>
								<span class="mu-badge kafka" ng-show="ctrl.errorKafka">{{ctrl.errorKafka}}</span>
								<span class="mu-badge eventmanage" ng-show="ctrl.errorEventManager">{{ctrl.errorEventManager}}</span>
								<span class="mu-badge spark" ng-show="ctrl.errorSpark">{{ctrl.errorSpark}}</span>
								<span class="mu-badge mariadb" ng-show="ctrl.errorMariaDB">{{ctrl.errorMariaDB}}</span>
								<span class="mu-badge elastic" ng-show="ctrl.errorElastic">{{ctrl.errorElastic}}</span>
							</div>
						</div>
					</div>

				</div>
			</div>
			<div class="mu-row mu-row-maria">
				<div class="mu-col mu-col-4">

					<div class="mu-panel">
						<div class="mu-panel-head">
							<span class="mu-title">MariaDB</span>
							<div class="mu-item-group fr">
								<span class="usage">Disk Usage <strong>{{ctrl.mariaDbDiskUsage | byteFormat:1}}</strong></span>
							</div>
						</div>
						<div class="mu-panel-body">
							<div class="mu-grid-scroll mu-grid-border">
								<table class="mu-grid">
									<colgroup>
										<col>
										<col width="90">
										<col width="75">
										<col width="85">
										<col width="17"><!-- scroll bar width -->
									</colgroup>
									<thead>
									<tr>
										<th>Table Name</th>
										<th>Table Rows</th>
										<th>Data Size<%--(MB)--%></th>
										<th>Index Size<%--(MB)--%></th>
										<th></th><!-- scroll bar width -->
									</tr>
									</thead>
								</table>
								<div class="mu-scroll-v">
									<table class="mu-grid">
										<colgroup>
											<col>
											<col width="90">
											<col width="75">
											<col width="85">
										</colgroup>
										<tbody>
										<tr ng-repeat="md in ctrl.mariaDbList track by $index">
											<td>{{md.tableName}}</td>
											<td>{{md.tableRows}}</td>
											<td>{{md.dataSizeMB}}</td>
											<td>{{md.indexSizeMB}}</td>
											<%--<td>{{md.dataSizeCM}}</td>--%>
											<%--<td>{{md.indexSizeCM}}</td>--%>
											<%--<td>{{md.dataSizeCF}}</td>--%>
											<%--<td>{{md.indexSizeCF}}</td>--%>
										</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

				</div>
				<div class="mu-col mu-col-4">

					<div class="mu-panel">
						<div class="mu-panel-head">
							<span class="mu-title">Elastic Search</span>
							<div class="mu-item-group fr">
								<span class="usage">Disk Usage <strong>{{ctrl.elasticSearchDiskUsage | byteFormat:1}}</strong></span>
							</div>
						</div>
						<div class="mu-panel-body">
							<div class="mu-grid-scroll mu-grid-border">
								<table class="mu-grid">
									<colgroup>
										<col>
										<col width="80">
										<col width="80">
										<col width="80">
										<col width="17"><!-- scroll bar width -->
									</colgroup>
									<thead>
									<tr>
										<th>Index</th>
										<th>Shares</th>
										<th>Replica</th>
										<th>Size</th>
										<th></th><!-- scroll bar width -->
									</tr>
									</thead>
								</table>
								<div class="mu-scroll-v">
									<table class="mu-grid">
										<colgroup>
											<col>
											<col width="80">
											<col width="80">
											<col width="80">
										</colgroup>
										<tbody>
										<tr ng-repeat="es in ctrl.elasticSearchList track by $index">
											<td>{{es.index}}</td>
											<td>{{es.shares}}</td>
											<td>{{es.replica}}</td>
											<td>{{es.size}}</td>
										</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

				</div>
				<div class="mu-col mu-col-4">

					<div class="mu-panel">
						<div class="mu-panel-head">
							<span class="mu-title">Kafka</span>
						</div>
						<div class="mu-panel-body">
							<div class="mu-grid-scroll mu-grid-border">
								<table class="mu-grid">
									<colgroup>
										<col>
										<col width="160">
										<col width="17"><!-- scroll bar width -->
									</colgroup>
									<thead>
									<tr>
										<th>Topic</th>
										<th>Message</th>
										<th></th><!-- scroll bar width -->
									</tr>
									</thead>
								</table>
								<div class="mu-scroll-v">
									<table class="mu-grid">
										<colgroup>
											<col>
											<col width="160">
										</colgroup>
										<tbody>
										<tr ng-repeat="kf in ctrl.kafkaList track by $index">
											<td>{{kf.topic}}</td>
											<td>{{kf.messagesinpersec}}</td>
										</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
			<div class="mu-row mu-row-kafka">
				<div class="mu-col mu-col-tab">

					<div class="mu-panel">
						<div class="mu-panel-head">
							<ul class="mu-tab">
								<li ng-class="ctrl.seletedChartTab == 0 ? 'active' : ''"><a href="" ng-click="ctrl.seletedChartTab = 0">Kafka</a></li>
								<li ng-class="ctrl.seletedChartTab == 1 ? 'active' : ''"><a href="" ng-click="ctrl.seletedChartTab = 1">System</a></li>
								<li ng-class="ctrl.seletedChartTab == 2 ? 'active' : ''"><a href="" ng-click="ctrl.seletedChartTab = 2">Memory</a></li>
								<li ng-class="ctrl.seletedChartTab == 3 ? 'active' : ''"><a href="" ng-click="ctrl.seletedChartTab = 3">Network</a></li>
								<li ng-class="ctrl.seletedChartTab == 4 ? 'active' : ''"><a href="" ng-click="ctrl.seletedChartTab = 4">Disk</a></li>
							</ul>
						</div>
						<div class="mu-panel-body mu-tab-body" ng-show="ctrl.seletedChartTab == 0">
							<chart-basic data="ctrl.chartDataKafka" chart-width="1456px" chart-height="174px"></chart-basic>
						</div>
						<div class="mu-panel-body mu-tab-body" ng-show="ctrl.seletedChartTab == 1">
							<chart-basic data="ctrl.chartDataSystem" chart-width="1456px" chart-height="174px"></chart-basic>
						</div>
						<div class="mu-panel-body mu-tab-body" ng-show="ctrl.seletedChartTab == 2">
							<chart-basic data="ctrl.chartDataMemory" chart-width="1456px" chart-height="174px"></chart-basic>
						</div>
						<div class="mu-panel-body mu-tab-body" ng-show="ctrl.seletedChartTab == 3">
							<chart-basic data="ctrl.chartDataNetwork" chart-width="1456px" chart-height="174px"></chart-basic>
						</div>
						<div class="mu-panel-body mu-tab-body" ng-show="ctrl.seletedChartTab == 4">
							<chart-basic data="ctrl.chartDataDisk" chart-width="1456px" chart-height="174px"></chart-basic>
						</div>
					</div>

				</div>
			</div>
		</div>
		<!-- //Volume -->
	</div>
</section>