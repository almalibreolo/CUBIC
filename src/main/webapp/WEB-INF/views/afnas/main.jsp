<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<tiles:insertDefinition name="defaultTemplate">
	<tiles:putAttribute name="body">
	
		<!-- container -->
		<div id="container" class="mu-container">
			<ng-view></ng-view>
		</div>
		<!-- //container -->
			
		<script>
			var _version = "201703080203"
			var require = {
               urlArgs : "ver=" + _version	                
			};
		</script>
		<script type="text/javascript" data-main="/resources/js/afnas/main" src="/resources/js/lib/require/require.min.js"></script>

	</tiles:putAttribute>
</tiles:insertDefinition>