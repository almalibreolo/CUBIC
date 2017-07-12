<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<style>
	div[width] {
		border: solid 1px #aaaaaa;
	}
</style>

<h1> Sample - JQuery Dashboard</h1>

<div layout-container="vertical" width="100%" height="100%" gap="5px" ng-controller="DashboardCtrl as dashboardCtrl">
	<div id="dashboard" width="100%" height="100%" scrollbar-policy="auto"></div>	
	
	<div layout-container="horizontal" vertical-align="middle" width="100%" height="150px" gap="5px">
		<div width="300px" height="100%"layout-container="vertical" gap="5px">
			<h2>대시보드에 들어갈 HTML 코드를 입력</h2>
			<textarea width="100%" height="100%" rows="1" cols="1" ng-model="dashboardCtrl.data.html"></textarea>
		</div>
		
		<div  width="100%" height="100%" layout-container="vertical" gap="5px">
			<h2>대시보드 패널 정보를 입력</h2>
			<div width="100%" height="100%" layout-container="horizontal" vertical-align="middle" gap="10px">
				<label>제목</label> <input type="text" width="300px" height="30px" ng-model="dashboardCtrl.data.title"></input>
				<label>너비</label> <input type="text" width="150px" height="30px" ng-model="dashboardCtrl.data.width"></input>
				<label>높이</label> <input type="text" width="150px" height="30px" ng-model="dashboardCtrl.data.height"></input>
				
				<select width="150px" height="30px" ng-model="dashboardCtrl.data.type" ng-change="dashboardCtrl.changeLayout()">
				    <option value="free">자유 배치</option>
				    <option value="column">컬럼 배치</option>
				    <option value="tile">타일 배치</option>
				</select>
				
				<span width="20px"></span>
				
				<label>편집모드</label> <input type="checkbox" ng-model="dashboardCtrl.data.edit" ng-change="dashboardCtrl.changeEdit()">
				
				<span width="40px"></span>
								
				<input type="button" value="창 추가" width="150px" height="30px" ng-click="dashboardCtrl.addPanel()"></input>
			</div>
		</div>
	</div> 
</div>
