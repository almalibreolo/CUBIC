<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<section ng-controller="AlarmCtrl as alarmCtrl">

	<div class="mu-row mu-row-alarm-stat">
		<!-- Status -->
		<div class="mu-col mu-col-alarm-stat">

			<div class="mu-panel">
				<div class="mu-panel-body">
					<ul class="alarm-stat">
						<li class="critical selected" id="btnCritical" ng-click="alarmCtrl.clickSeverity('critical')"><!-- toggle button - selected 추가 -->
							<dl>
								<dt>Critical</dt>
								<dd>{{alarmCtrl.count.cr}}</dd>
							</dl>
						</li>
						<li class="major selected" id="btnMajor" ng-click="alarmCtrl.clickSeverity('major')">
							<dl>
								<dt>Major</dt>
								<dd>{{alarmCtrl.count.mj}}</dd>
							</dl>
						</li>
						<li class="minor selected" id="btnMinor" ng-click="alarmCtrl.clickSeverity('minor')">
							<dl>
								<dt>Minor</dt>
								<dd>{{alarmCtrl.count.mi}}</dd>
							</dl>
						</li>
					</ul>
					<div class="alarm-time">
						<!-- <div class="mu-selectbox">list펼침시 on추가
							<button class="mu-value">Average</button>
							<ul class="mu-list">
								<li value="1">Average</li>
								<li value="2">Average</li>
								<li value="3">Average</li>
							</ul>
						</div> -->
						<select-box values="alarmCtrl.aggregationFuncs"
							on-data-change="alarmCtrl.onChangeAggregationFunc(value)">
						</select-box>
						<div class="resolved-time">Resolved Time : {{alarmCtrl.resolvedTime}}</div>
					</div>
				</div>
			</div>

		</div>
		<!-- //Status -->
	</div>

	<div class="mu-row">
		<!-- Service -->
		<div class="mu-col mu-col-alarm-list">

			<div class="mu-panel">
				<div class="mu-panel-head">
					<span class="mu-title">Alarm List</span>
				</div>
				<div class="mu-panel-body">
					<div class="alarm-filter">
						<ul>
							<li class="service" id="btnService" ng-class="alarmCtrl.service == true? 'active':''" ng-click="alarmCtrl.clickResource('service')">Service</li>
							<li class="volume" id="btnVolume" ng-class="alarmCtrl.volume? 'active':''" ng-click="alarmCtrl.clickResource('volume')">Volume</li>
							<li class="node" id="btnHost" ng-class="alarmCtrl.host? 'active':''" ng-click="alarmCtrl.clickResource('host')">Node</li>
						</ul>
					</div>
					<div class="mu-grid-wrap alarm-list">
						<div class="mu-grid-top">
							<div class="mu-hgroup fl">
								<div class="mu-item-group">
									<div class="mu-btn-dropdown" ng-class="alarmCtrl.searchDetailMode ? 'on':''">
										<input type="text" class="mu-input" ng-model="alarmCtrl.searchText">
										<button type="button" class="mu-btn mu-btn-icon" ng-click="alarmCtrl.searchDetailMode = !alarmCtrl.searchDetailMode"></button>
										<div class="mu-dropdown-body" style="z-index: 1;">
											<table class="mu-formbox">
												<colgroup>
													<col width="150px">
													<col width="">
													<col width="90px">
												</colgroup>
												<tbody>
												<tr ng-repeat="param in alarmCtrl.searchDetailParamList track by $index">
													<th>
														<select-box values="param.selectList" on-data-change="alarmCtrl.onChangeSearchDetailTypeList($index, value, valueOld)" ng-model="param.type" selected-text="{{param.type}}"></select-box>
													</th>
													<td ng-show="param.type=='message'">
														<input type="text" class="mu-input" placeholder="Message" ng-model="param.value">
													</td>
													<td ng-show="param.type=='serviceName'">
														<input type="text" class="mu-input" placeholder="Service Name" ng-model="param.value">
													</td>
													<td ng-show="param.type=='volumeName'">
														<input type="text" class="mu-input" placeholder="Volume Name" ng-model="param.value">
													</td>
													<td ng-show="param.type=='hostName'">
														<input type="text" class="mu-input" placeholder="Node Name" ng-model="param.value">
													</td>
													<td ng-show="param.type=='resource'">
														<div class="mu-selectbox" ng-class="false && alarmCtrl.isSearchDetailResource ? 'on':''">
															<input type="text" class="mu-input" placeholder="Resource" ng-model="param.value"  ng-change="alarmCtrl.onChangeSearchDetailInput('Resource', param.value)">
															<ul class="mu-list" ng-mouseover="alarmCtrl.onOverSearchDetailList('Resource')" ng-mouseleave="alarmCtrl.onLeaveSearchDetailList('Resource')">
																<li value="host.hostName" ng-repeat="host in alarmCtrl.statusHostList | filter:param.value" ng-click="alarmCtrl.onClickSearchDetailList('Resource', host.hostName)">{{host.hostName}}</li>
															</ul>
														</div>
													</td>
													<td ng-show="param.type=='location'">
														<input type="text" class="mu-input" placeholder="Location" ng-model="param.value"  ng-change="alarmCtrl.onChangeSearchDetailInput('Location', param.value)">
													</td>
													<td ng-show="param.type=='alarmCode'">
														<div class="mu-selectbox" ng-class="false && alarmCtrl.isSearchDetailAlarmCode ? 'on':''">
															<input type="text" class="mu-input" placeholder="Alarm Code" ng-model="param.value" ng-change="alarmCtrl.onChangeSearchDetailInput('AlarmCode', param.value)">
															<ul class="mu-list" ng-mouseover="alarmCtrl.onOverSearchDetailList('AlarmCode')" ng-mouseleave="alarmCtrl.onLeaveSearchDetailList('AlarmCode')">
																<li value="event.eventSeq" ng-repeat="event in alarmCtrl.eventConfigList | filter:param.value" ng-click="alarmCtrl.onClickSearchDetailList('AlarmCode', event.eventSeq)">{{event.eventSeq}}</li>
															</ul>
														</div>
													</td>
													<td ng-show="param.type=='alarmName'">
														<div class="mu-selectbox" ng-class="false && alarmCtrl.isSearchDetailAlarmName ? 'on':''">
															<input type="text" class="mu-input" placeholder="Alarm Name" ng-model="param.value" ng-change="alarmCtrl.onChangeSearchDetailInput('AlarmName', param.value)">
															<ul class="mu-list" ng-mouseover="alarmCtrl.onOverSearchDetailList('AlarmName')" ng-mouseleave="alarmCtrl.onLeaveSearchDetailList('AlarmName')">
																<li value="eventName" ng-repeat="eventName in alarmCtrl.eventNameList | filter:param.value" ng-click="alarmCtrl.onClickSearchDetailList('AlarmName', eventName)">{{eventName}}</li>
															</ul>
														</div>
													</td>
													<td ng-show="param.type=='tag'">
														<input type="text" class="mu-input" placeholder="Tag" ng-model="param.value">
													</td>
													<td ng-show="false">
														<select-box values="alarmCtrl.severityFullList"></select-box>
													</td>
													<td ng-show="false">
														<div class="mu-datepicker">
															<input type="text" value="05/20/2015" readonly="readonly">
															<button class="mu-btn mu-btn-icon mu-btn-icon-only"><i class="mu-icon calendar"></i></button>
														</div>
														<span>~</span>
														<div class="mu-datepicker">
															<input type="text" value="05/20/2015" readonly="readonly">
															<button class="mu-btn mu-btn-icon mu-btn-icon-only"><i class="mu-icon calendar"></i></button>
														</div>
													</td>
													<td>
														<button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only cancel" ng-hide="alarmCtrl.searchDetailParamList.length==1" ng-click="alarmCtrl.clickSearchDetailRemoveParam($index)"><i class="mu-icon minus"></i></button>
														<button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only" ng-show="($index==alarmCtrl.searchDetailParamList.length-1) && ($index < alarmCtrl.searchDetailTypeList.length-1)" ng-click="alarmCtrl.clickSearchDetailAddParam($index)"><i class="mu-icon plus"></i></button>
													</td>
												</tr>
												</tbody>
											</table>
											<div class="mu-btn-wrap">
												<button type="button" class="mu-btn mu-btn-icon" ng-click="alarmCtrl.clickDetailSearch()"><i class="mu-icon check"></i>확인</button>
												<button type="button" class="mu-btn mu-btn-icon cancel" ng-click="alarmCtrl.searchDetailMode = false"><i class="mu-icon close"></i>취소</button>
											</div>
										</div>
									</div>
									<button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only" ng-click="alarmCtrl.clickSearchText()"><i class="mu-icon search"></i></button>
								</div>
								<time-control class="mu-item-group"
									start-time="alarmCtrl.sdate"
									end-time="alarmCtrl.edate"
									is-play="alarmCtrl.isPlay" 
									forward-button-disabled="alarmCtrl.forwardButtonDisabled"
									p-time-range-change="alarmCtrl.timeRangeChange(start, end, timeRange)"
									p-play="alarmCtrl.play(start, end)"
						            p-pause="alarmCtrl.pause()"
						            p-backward="alarmCtrl.backward(start, end)"
						            p-forward="alarmCtrl.forward(start, end)"
									date-time-apply="alarmCtrl.customDateTimeApply(startDateTime, endDateTime, timeRange)"
									date-time-cancel="alarmCtrl.dateTimeCancel()"
								    position-top="alarmCtrl.positionTop"
									position-right="alarmCtrl.positionRight"
						            >
								</time-control>
							</div>
							<div class="mu-hgroup fr">
								<div class="mu-item-group">
									<button type="button" class="mu-btn mu-btn-icon" ng-click="alarmCtrl.exportExcelCsv('csv')"><i class="mu-icon download"></i>CSV Download</button>
								</div>
							</div>
						</div>
						<!-- grid -->
						<div class="mu-grid-body" ui-grid="alarmCtrl.listGridOptions" ui-grid-selection ui-grid-exporter>
						</div>
						<div class="pagination-area-total" ng-show="alarmCtrl.data.list">
							<div class="pagination-area">
								<pagination total-items="alarmCtrl.data.count" rotate="false" items-per-page="alarmCtrl.pageCount" max-size="10" ng-model="alarmCtrl.pageIndex" class="pagination" boundary-links="true" ng-change="alarmCtrl.onChangePageIndex()"></pagination>
							</div>
							<div class="result-page-group">
								<span class="title">Results per page</span>
								<select-box values="alarmCtrl.pagePerCountList" on-data-change="alarmCtrl.onPageDataChange(event, value)" mode="up"></select-box>
							</div>
						</div>
						<!-- //grid -->
					</div>
				</div>
			</div>

		</div>
		<!-- //Service -->

		<!-- Volume -->
		<div class="mu-col mu-col-alarm-defi">

			<div class="mu-panel">
				<div class="mu-panel-head">
					<span class="mu-title">Alarm Definition</span>
				</div>
				<div class="mu-panel-body">
					<div class="mu-grid-wrap alram-rule">
						<div class="mu-grid-top">
							<div class="mu-item-group fl">
								<input type="text" class="mu-input" placeholder="search..." ng-model="alarmCtrl.searchDefineText">
								<button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only" ng-click="alarmCtrl.clickSearchDefine()"><i class="mu-icon search"></i></button>
							</div>
							<div ng-show="alarmCtrl.alarmEditMode == true" class="mu-item-group fr">
								<button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only" ng-click="alarmCtrl.clickEditDefine()"><i class="mu-icon check"></i></button>
								<button ng-click="alarmCtrl.alarmEditMode = false" type="button" class="mu-btn mu-btn-icon mu-btn-icon-only"><i class="mu-icon close"></i></button>
							</div>
							<div ng-show="alarmCtrl.alarmEditMode == false" class="mu-item-group fr">
								<button ng-click="alarmCtrl.alarmEditMode = true" type="button" class="mu-btn mu-btn-icon mu-btn-icon-only"><i class="mu-icon edit"></i></button>
							</div>
						</div>
						<!-- grid -->
						<div class="mu-grid-body" ui-grid="alarmCtrl.defineGridOptions" ui-grid-selection ui-grid-exporter>
						</div>
						<!-- //grid -->
					</div>
					<div class="alarm-detail">
						<div class="mu-panel">
							<div class="mu-panel-head">
								<span class="mu-title">Detail</span>
							</div>
							<div class="mu-panel-body">
								<table class="mu-formbox">
									<tbody>
									<tr>
										<th>Alarm Code:</th>
										<td>{{alarmCtrl.selectedDefineGridRow.eventSeq}}</td>
									</tr>
									<tr>
										<th>Alarm Name:</th>
										<td>{{alarmCtrl.selectedDefineGridRow.alarmName}}</td>
									</tr>
									<tr>
										<th>Severity:</th>
										<td>{{alarmCtrl.selectedDefineGridRow.severity}}</td>
									</tr>
									<tr>
										<th>Create Date:</th>
										<td>{{alarmCtrl.selectedDefineGridRow.insertTime}}</td>
									</tr>
									<tr>
										<th>Process Name:</th>
										<td>{{alarmCtrl.selectedDefineGridRow.processName}}</td>
									</tr>
									<%--<tr>
										<th>Rule:</th>
										<td>CPU_IDLE > 60</td>
									</tr>--%>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
		<!-- //Volume -->
	</div>
</section>

