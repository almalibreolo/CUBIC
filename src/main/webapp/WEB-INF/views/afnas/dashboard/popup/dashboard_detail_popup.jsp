<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<%--<div class="mu-dialog-background"></div><!-- dialog 배경 -->--%>
<div class="mu-dialog mu-fix-foot service-detail" style="top:0px;left:0px;width:800px;height:600px;" ng-controller="ServiceDetailCtrl as popupCtrl" ng-style="popupCtrl.style">
	<div class="mu-dialog-head">
		<span class="title">{{popupCtrl.title}} Detail</span>
		<button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only" ng-click="closeThisDialog()"><i class="mu-icon-img close"></i></button>
	</div>

	<div class="mu-dialog-body" ng-show="popupCtrl.dataType == 'service'">
		<div class="service-box" ng-class="popupCtrl.alarmSeverity">
			<div class="service-stat"></div>
			<div class="service-info">
				<span class="mu-title" style="width: 200px;">Name: {{popupCtrl.name}}<br>Type: {{popupCtrl.type}}</span>
				<button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only btn-stop"><i class="mu-icon stop"></i></button>
				<!--<button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only btn-play"><i class="mu-icon play"></i></button>-->
			</div>
		</div>
		<dl ng-show="popupCtrl.smbConfig ? true : false">
			<dt>SMB</dt>
			<dd>
				<pre>{{popupCtrl.smbConfig}}</pre>
			</dd>
		</dl>
		<dl>
			<dt>Volume</dt>
			<dd>
				<pre>{{popupCtrl.gfsConfig}}</pre>
			</dd>
		</dl>
	</div>

	<div class="mu-dialog-body" ng-show="popupCtrl.dataType == 'volume'">
		<div class="disk-box" ng-class="popupCtrl.alarmSeverity">
			<div class="disk-set">
				<span ng-repeat="n in popupCtrl.unusedList track by $index"></span>
				<span class="used" ng-repeat="n in popupCtrl.usedList track by $index"></span>
			</div>
			<div class="disk-info">
				<span class="mu-title" style="width: 200px;">Name: {{popupCtrl.name}}<br>Type: {{popupCtrl.type}}</span>
				<button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only btn-stop"><i class="mu-icon stop"></i></button>
				<!--<button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only btn-play"><i class="mu-icon play"></i></button>-->
			</div>
		</div>
		<dl>
			<dt>Volume</dt>
			<dd>
				<pre>{{popupCtrl.gfsConfig}}</pre>
			</dd>
		</dl>
	</div>

	<div class="mu-dialog-foot">
		<button type="button" class="mu-btn mu-btn-icon cancel" ng-click="closeThisDialog()"><i class="mu-icon close"></i>CLOSE</button>
	</div>
</div>