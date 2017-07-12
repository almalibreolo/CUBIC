<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<section ng-controller="SystemCtrl as systemCtrl">
	<div class="mu-row mu-row-management">
		<div class="mu-col">

			<div class="mu-panel">
				<div class="mu-panel-head">
					<span class="mu-title">System Management</span>
					<div class="mu-item-group fr">
						<button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only" ng-click="systemCtrl.setPolling()"><i class="mu-icon" ng-class="systemCtrl.isPolling() ? 'pause' : 'play'"></i></button>
						<button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only" ng-click="systemCtrl.refresh()"><i class="mu-icon repeat"></i></button>
						<span class="update">Last Update <strong>{{systemCtrl.lastUpdateTime}}</strong></span>
					</div>
				</div>
				<div class="mu-panel-body">
					<div class="mu-grid-wrap">
						<div class="mu-grid-top">
							<span class="mu-title">Collection information</span>
						</div>
						<div class="mu-grid-body">
							<div id="ui-grid-ct" ui-grid="systemCtrl.gridOptionsCollectTime" ui-grid-auto-resize style="height: 100%;"></div>
						</div>
					</div>

					<div class="mu-grid-wrap">
						<div class="mu-grid-top">
							<span class="mu-title">Process information</span>
						</div>
						<div class="mu-grid-body">
							<div id="ui-grid-p" ui-grid="systemCtrl.gridOptionsProcess" ui-grid-auto-resize style="height: 100%;"></div>
						</div>
					</div>
					
					<div class="mu-grid-wrap">
						<div class="mu-grid-top">
							<span class="mu-title">Process topic information</span>
						</div>
						<div class="mu-grid-body">
							<div id="ui-grid-pti" ui-grid="systemCtrl.gridOptionsProcessTopicInfo" ui-grid-auto-resize style="height: 100%;"></div>
						</div>
					</div>
					
					<div class="mu-grid-wrap">
						<div class="mu-grid-top">
							<span class="mu-title">Server information</span>
						</div>
						<div class="mu-grid-body">
							<div id="ui-grid-s" ui-grid="systemCtrl.gridOptionsServer" ui-grid-auto-resize style="height: 100%;"></div>
						</div>
					</div>
					
					<%--<div class="mu-grid-wrap">
						<div class="mu-grid-top">
							<span class="mu-title">Server information</span>
						</div>
						<div class="mu-grid-body">
							<div id="ui-grid-sci" ui-grid="systemCtrl.gridOptionsServerCheckInfo" ui-grid-auto-resize style="height: 100%;"></div>
						</div>
					</div>--%>
				</div>
			</div>

		</div>
	</div>
</section>