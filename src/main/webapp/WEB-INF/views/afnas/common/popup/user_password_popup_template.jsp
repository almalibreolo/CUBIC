<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>


    <!-- dialog -->
<div style="top:-100px;left:-100px; width:376px;height:167px;">
	<div class="mu-dialog">
	<form name="passwordConfirmForm" ng-submit="confirm()">
		<div class="mu-dialog-head">
			<span class="title">Please enter a password</span>
			<button type="button" class="mu-btn mu-btn-icon mu-btn-icon-only" ng-click="cancel()"><i class="mu-icon-img close"></i></button>
		</div>
		<div class="mu-dialog-body">
			<div class="mu-dialog-content">
				<table class="mu-formbox">
					<colgroup>
						<col style="width:110px">
					</colgroup>
					<tbody>
						<tr>
							<th>Password</th>
							<td>
								<div class="mu-item-group">
									<input required name="password" type="password" class="mu-input" required minlength='4' placeholder="Password" ng-model="checkPass">
									<!--<div ng-messages="addForm.password.$error">
                                    <div ng-message="required"><span class="error-txt">This is required.</span></div>
								</div>-->
								</div>
							</td>
						</tr>			
					</tbody>
				</table>
			</div>
		</div>
		<div class="mu-dialog-foot">
			<button type="submit" class="mu-btn mu-btn-icon"><i class="mu-icon check"></i>CONFIRM</button>
			<button type="button" class="mu-btn mu-btn-icon cancel" ng-click="cancel()"><i class="mu-icon close"></i>CANCEL</button>
		</div>
		</form>
	</div>
</div>
	<!-- //dialog -->
   
