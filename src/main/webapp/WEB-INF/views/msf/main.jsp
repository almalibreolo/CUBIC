<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<tiles:insertDefinition name="sampleDefaultTemplate">
	<tiles:putAttribute name="body">
	
		<!-- container -->
		<div id="container">
			<ng-view width="100%" height="100%" layout-container="vertical"></ng-view>
		</div>
		<!-- //container -->
			
		<script>
			var require = {
               urlArgs : "ver=201602221114"		                
			};
		</script>
		<script type="text/javascript" data-main="/resources/js/msf/main" src="/resources/js/lib/require/require.min.js"></script>

	</tiles:putAttribute>
</tiles:insertDefinition>