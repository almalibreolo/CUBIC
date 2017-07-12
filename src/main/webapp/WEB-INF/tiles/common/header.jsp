<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<header ng-controller="HeaderCtrl as headerCtrl">
	<h1 class="fl" ng-click="headerCtrl.navigate('/dashboard')"><span>CUBIC</span></h1>
	<nav class="mu-gnb fl">
		<ul class="mu-hMenu fl">
            <li ng-class="headerCtrl.isActive('/dashboard')"><a href="" ng-click="headerCtrl.navigate('/dashboard')"><span>{{"MENU.DASHBOARD" | translate }}</span></a></li>
            <%--<li ng-class="headerCtrl.isActive('/system')"><a href="" ng-click="headerCtrl.navigate('/system')"><span>{{"MENU.SYSTEM" | translate }}</span></a></li>--%>
	        <%--<li><a href="" ng-click=""><span>{{"MENU.RESOURCES" | translate }}</span></a></li>--%>
            <li ng-class="headerCtrl.isActive('/alarm')"><a href="" ng-click="headerCtrl.navigate('/alarm')"><span>{{"MENU.ALARM" | translate }}</span></a></li>
			<li ng-class="headerCtrl.isActive('/monitoring')"><a href="" ng-click="headerCtrl.navigate('/monitoring')"><span>{{"MENU.MONITORING" | translate }}</span></a></li>
            <%--<li ng-class="headerCtrl.isActive('/analytics')"><a href="" ng-click="headerCtrl.navigate('/analytics')"><span>{{"MENU.ANALYTICS" | translate }}</span></a></li>--%>
            <%--<li><a href="" ng-click=""><span>{{"MENU.REPORTS" | translate }}</span></a></li>--%>
        </ul>
		<div class="mu-topMenu fr">
			<button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only"><i class="mu-icon bell"></i><span class="mu-badge">{{headerCtrl.alarmCount.total}}</span></button>
			<div class="mu-tooltip bottom">
				<div class="arrow"></div>
				<ul class="mu-list">
						<li class="critical">
							<span class="remark"></span>
							<span class="tit">Critical</span>
							<span class="num">{{headerCtrl.alarmCount.critical}}</span>
						</li>
						<li class="major">
							<span class="remark"></span>
							<span class="tit">Major</span>
							<span class="num">{{headerCtrl.alarmCount.major}}</span>
						</li>
						<li class="minor">
							<span class="remark"></span>
							<span class="tit">Minor</span>
							<span class="num">{{headerCtrl.alarmCount.minor}}</span>
						</li>
					</ul>
				</div>

			<!-- <button type="button" class="mu-btn mu-btn-icon" ng-click="headerCtrl.navigate('/system')"><i class="mu-icon setting"></i>Settings</button>-->
			<button type="button" class="mu-btn mu-btn-icon" ng-click="headerCtrl.help()"><i class="mu-icon question"></i>Support</button>
			<button type="button" class="mu-btn mu-btn-icon" id="user-button"  ng-click="headerCtrl.update()" ><i class="mu-icon user"></i><sec:authentication property="principal.username"/></button>
			<button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only" title="Logout" ng-click="headerCtrl.logout()"><i class="mu-icon logout"></i></button>
        </div>
    </nav>
</header>
<form id="excelForm" style="display:none">
</form>