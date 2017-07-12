package com.mobigen.framework.result;

import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;

public class JsonResult
{
	public static final int RESULT_SUCCESS = 1;
	public static final int RESULT_FAIL = 0;

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	/**
	 * 특정 명령 처리 결과에 대한 성공 여부를 표시 한다
	 * RESULT_SUCCESS: 성공
	 * RESULT_FAIL: 실패
	 */
	private int result = RESULT_FAIL;
	public int getResult() {
		return result;
	}
	public void setResult(int result) {
		this.result = result;
	}


	/**
	 * 만일 result가 RESULT_FAIL 인 경우 에러메세지를 지정 한다.
	 * 만일 exception이 발생 했다면 예외메세지를 지정 할 수 도 있다
	 */
	private String errorMessage = "";
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
		this.result = RESULT_FAIL;

		logger.error(errorMessage);
	}
	public void setErrorMessage(Exception e) {
		if (e instanceof DataIntegrityViolationException)
			this.errorMessage = ((SQLException) e.getCause().getCause()).getMessage();

		else if (e instanceof SQLException)
			this.errorMessage = e.getMessage();

		else
			this.errorMessage = e.getMessage();

		logger.error(errorMessage);

		this.result = RESULT_FAIL;
	}
	public void setErrorMessage(String errorMessage, Exception e) {
		this.errorMessage = errorMessage;
		this.result = RESULT_FAIL;
		logger.error(errorMessage, e);
	}

	/**
	 * 실제로 클라이언트에 반환 할 데이터를 지정 한다
	 */
	private Object data = null;
	public Object getData() {
		return data;
	}
	public void setData(Object value) {
		data = value;
		this.result = RESULT_SUCCESS;
	}
}
