<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<div ng-controller="HeaderCtrl as headerCtrl">
	<md-content class="md-padding">
		<md-nav-bar md-selected-nav-item="headerCtrl.currentNavItem" nav-bar-aria-label="navigation links">
			<md-nav-item md-nav-click="headerCtrl.navigate('/sample-mdi')" name="page-mdi">{{"SAMPLE.MDI" | translate }}</md-nav-item>
			<md-nav-item md-nav-click="headerCtrl.navigate('/sample-dashboard')" name="page-dashboard">{{"SAMPLE.DASHBOARD" | translate }}</md-nav-item>
			<md-nav-item md-nav-click="headerCtrl.navigate('/sample-websocket')" name="page-websocket">{{"SAMPLE.WEBSOCKET" | translate }}</md-nav-item>		
		</md-nav-bar>
	</md-content>
</div>