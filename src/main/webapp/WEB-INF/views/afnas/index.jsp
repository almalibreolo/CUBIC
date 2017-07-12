<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<tiles:insertDefinition name="indexTemplate">
	<tiles:putAttribute name="body">

		<div id="container" class="login-container" ng-app="app" ng-cloak>
		<h1>SK Telecom</h1>
		<div class="login-area" ng-controller="IndexCtrl as indexCtrl">
			<%--<md-content layout-padding width="400px" height="300px">--%>
				<form name="userForm" ng-submit="indexCtrl.login()">
					<fieldset>
						<legend>CUBIC Login</legend>
						<h2>CUBIC Supervisor Platform of All-flash s-Cube</h2>
						<div class="login-input">
							<input type="text" placeholder="username" title="username" class="id" required minlength='4' name="username" ng-model="indexCtrl.user.userId">
						</div>
						<div class="login-input">
							<input type="password" placeholder="password" title="password" class="pw" required minlength='4' name="password" ng-model="indexCtrl.user.userpass">
						</div>
						<div class="login-btns"><button type="submit" class="login">LOGIN</button><button type="button" class="join" ng-click="indexCtrl.join()">JOIN</button></div>
					</fieldset>
			    </form>
			<%--</md-content>--%>
			<p class="login-info">본 솔루션은 <em>Chrome Browser</em>에서 사용하실 수 있습니다.<br>해상도 <em>1920*1024</em>에 최적화 되어 있습니다.</p>
		</div>
		<ul class="login-list">
			<li>All Flash Scale Out NAS - Service 기반의 On-demand dashboard 제공하여, ALL-Flash 환경에서 최고의 성능을 발휘할 수 있도록 최적화된 Scale-out NAS 솔루션을 제공</li>
			<li>Abnormal Detection & Analytic Report - 시스템 장애 및 이상 증상에 대한 선 감지 기능 제공하여, 실시간 + 빅 데이터 기능과 분석을 통한 차후 모델링 보조역할 수행</li>
			<li>Operator Friendly - 장애 처리를 포함한 모든 운영 방식이 직관적이고 편리하며, 시선의 연속성과 정보 특성에 기반한 Layout 제공으로 운영자에게 직관적이고 편리한 UI 제공</li>
		</ul>
	</div>
	<div class="login-footer">
		<address><span class="blind">SK telecom</span>Copyright © SK Telecom. All rights reserved.</address>
	</div>

	</tiles:putAttribute>
</tiles:insertDefinition>