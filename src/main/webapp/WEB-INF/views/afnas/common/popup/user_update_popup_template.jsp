<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>


    <!-- dialog -->
<div style="top:-100px;left:-100px; width:376px;height:197px;">
	<div class="mu-dialog">
	<form name="updateForm" ng-submit="update()">
		<div class="mu-dialog-head">
			<span class="title">Update</span>
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
									<input required name="password" type="password" class="mu-input" required minlength='4' placeholder="Password" ng-model="updateUser.userpass">
									<!--<div ng-messages="addForm.password.$error">
                                    <div ng-message="required"><span class="error-txt">This is required.</span></div>
								</div>-->
								</div>
							</td>
						</tr>
						<tr>
							<th>Verify Password</th>
							<td>
								<div class="mu-item-group">
									<input required name="passwordConfirm" type="password" class="mu-input" placeholder="Verify Password" ng-model="updateUser.userpassConfirm">
									<!--<div ng-messages="addForm.passwordConfirm.$error">
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
			<button type="submit" class="mu-btn mu-btn-icon"><i class="mu-icon check"></i>UPDATE</button>
			<button type="button" class="mu-btn mu-btn-icon cancel" ng-click="cancel()"><i class="mu-icon close"></i>CANCEL</button>
		</div>
		</form>
	</div>
</div>
	<!-- //dialog -->
   
