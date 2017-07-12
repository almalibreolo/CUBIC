package com.mobigen.afnas.common.interceptor;

import java.util.Enumeration;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mobigen.afnas.common.CommonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class CommonInterceptor extends HandlerInterceptorAdapter {

	protected final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	CommonService commonService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		logger.info("===========================          START         ===========================");
		logger.info(" Request URI \t:  " + request.getRequestURI());

		Enumeration<String> paramNames = request.getParameterNames();
		while (paramNames.hasMoreElements()) {
			String key = (String) paramNames.nextElement();
			String value = request.getParameter(key);
			logger.debug(" RequestParameter Data ==>  " + key + " : " + value + "");
		}

		commonService.setRequestHistory(request.getRequestURI(), request.getParameterMap());

		return super.preHandle(request, response, handler);

	}

	/*@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
						   ModelAndView modelAndView) throws Exception {

		logger.info("===========================          END           ===========================");
		logger.info(" Request URI \t:  " + request.getRequestURI());
	}*/
}