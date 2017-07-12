package com.mobigen.framework.validator;

import java.security.PrivateKey;
import java.util.regex.Pattern;

import javax.servlet.http.HttpSession;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.mobigen.framework.util.rsa.RSAUtil;

public class UserRSAAccountValidator implements ConstraintValidator<UserRSAAccount, String> {

	public void initialize(UserRSAAccount constraintAnnotation) {
	}

	public boolean isValid(String value, ConstraintValidatorContext context) {
	    ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
	    HttpSession session = attr.getRequest().getSession();

	    PrivateKey privateKey = RSAUtil.getPrivateKeyAtSession(session);
	    String decryptValue = new String(value);
	    if (privateKey != null)
	    	decryptValue = RSAUtil.decryptRSA(privateKey, decryptValue);

		if(decryptValue == null || decryptValue.length() > 20)
			return false;

		if(decryptValue.length() < 4)
			return false;

		String regExp = "^[0-9a-zA-Z]*$";
		if (!Pattern.matches(regExp, decryptValue))
			return false;

		return true;
	}

}
