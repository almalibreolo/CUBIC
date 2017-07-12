<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<tiles:insertDefinition name="sampleIndexTemplate">
	<tiles:putAttribute name="body">
	
	<div id="container" width="100%" height="100%" layout="vertical" vertical-align="middle" horizontal-align="center" ng-app="app">
		<div width="400px" height="300px" layout="vertical" vertical-align="middle" horizontal-align="center" ng-controller="IndexCtrl as indexCtrl">
			<div width="380px" height="40px" layout="horizontal">
				<label for="account" width="100px">아이디</label> 
				<input type="text" id="account" width="100%" ng-model="indexCtrl.user.username">
			</div>
			<div width="380px" height="40px" layout="horizontal">
				<label for="password" width="100px">패스워드</label> 
				<input type="password" id="password" width="100%" ng-model="indexCtrl.user.password">
			</div>
			<div width="380px" height="40px" layout="horizontal" horizontal-align="right">
				<input type="button" value="로그인" ng-click="indexCtrl.login()">
			</div>
		</div>
	</div>	

	</tiles:putAttribute>
</tiles:insertDefinition>