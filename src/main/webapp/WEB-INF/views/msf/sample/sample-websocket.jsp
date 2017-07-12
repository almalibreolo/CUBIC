<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<style>
	div[width] {
		border: solid 1px #aaaaaa;
	}
	
	table, th, td {
		border: 1px solid grey;
		border-collapse: collapse;
		padding: 5px;
	}
	
	table tr:nth-child(odd) {
		background-color: #f2f2f2;
	}
	
	table tr:nth-child(even) {
		background-color: #ffffff;
	}
</style>

<h1>Sample - WebSocket (Worker)</h1>

<div layout-container="vertical" width="100%" height="100%" gap="5px" ng-controller="WebSocketCtrl as webSocketCtrl">
	<form>enable auto scroll: <input type="checkbox" ng-model="webSocketCtrl.autoScroll"></form>
	<div id="content" layout-container="vertical" width="100%" height="100%" gap="5px" scrollbar-policy="auto">
		<h2> Real- time Data</h2>
		<table id="data-table">
			<tbody vs-repeat vs-scroll-parent="#content">
			<tr ng-repeat="x in webSocketCtrl.data track by $index">
				<td>{{ x.num }}</td>
				<td>{{ x.key }}</td>
				<td>{{ x.value1 }}</td>
				<td>{{ x.value2 }}</td>
				<td>{{ x.value3 }}</td>
				<td>{{ x.value4 }}</td>
			</tr>
		</table>
	</div>
</div>
