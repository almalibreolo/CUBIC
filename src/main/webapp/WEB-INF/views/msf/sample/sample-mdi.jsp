<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<md-toolbar md-scroll-shrink>
	<div class="md-toolbar-tools">Sample - JQuery MDI (With Angular Material)</div>
</md-toolbar>
			
<div layout-container="vertical" width="100%" height="100%" gap="5px" ng-controller="MdiCtrl as mdiCtrl">
	<div id="mdi" width="100%" height="100%" scrollbar-policy="auto"></div>
	<div id="taskbar" layout-container="horizontal" width="100%" height="50px" vertical-align="middle" gap="5px"></div>
	
	<div layout-container="horizontal" vertical-align="middle" width="100%" height="200px" gap="5px">
		<div width="500px" height="100%"layout-container="vertical" gap="5px">
			<md-toolbar md-scroll-shrink>
				<div class="md-toolbar-tools">MDI에 들어갈 HTML 코드 입력</div>
			</md-toolbar>
			<md-input-container class="md-block" width="100%">
          		<label>HTML</label>
          		<textarea ng-model="mdiCtrl.data.html" rows="1" width="100%" md-select-on-focus></textarea>
        	</md-input-container>
		</div>
		
		<div width="100%" height="100%" layout-container="vertical" gap="5px">
			<md-toolbar md-scroll-shrink>
				<div class="md-toolbar-tools">MDI 정보 입력</div>
			</md-toolbar>
			<div width="100%" height="100%" layout-container="horizontal" vertical-align="top" gap="10px">
				<div layout-gt-sm="row" width="100%" height="60px">
					<md-input-container class="md-block" flex-gt-sm>
			            <label>제목</label>
			            <input ng-model="mdiCtrl.data.title">					
					</md-input-container>
					<md-input-container class="md-block" flex-gt-sm>
			            <label>너비</label>
			            <input ng-model="mdiCtrl.data.width">					
					</md-input-container>
					<md-input-container class="md-block" flex-gt-sm>
			            <label>높이</label>
			            <input ng-model="mdiCtrl.data.height">					
					</md-input-container>
				</div>
								
				<md-button class="md-raised" width="150px" ng-click="mdiCtrl.addMdi()">창 추가</md-button>
				<md-button class="md-raised" width="150px" ng-click="mdiCtrl.closeAllMdi()">모든 창 제거</md-button>
			</div>
		</div>
	</div>
</div>