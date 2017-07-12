package com.mobigen.framework.exception;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mobigen.framework.result.JsonResult;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
    @Autowired
    private MessageSourceAccessor messageAccessor;

    // Model Validation
    @ExceptionHandler(BindException.class)
    @ResponseBody
    public JsonResult bindExceptionHandler(BindException e) {
        log.error("Model Validation Exception", e);
        return getExceptionJsonResult(e.getFieldError());
    }

    // JSON Validation
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public JsonResult methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e) {
        log.error("JSON Validation Exception", e);

        BindingResult bindingResult = e.getBindingResult();
        return getExceptionJsonResult(bindingResult.getFieldError());
    }

    // Controller
    @ExceptionHandler(JsonResultException.class)
    @ResponseBody
    public JsonResult jsonResultExceptionHandler(JsonResultException e) {
        log.error("Controller Exception", e);
        return getExceptionJsonResult(e);
    }

    // Authentication
    @ExceptionHandler(AccessDeniedException.class)
    @ResponseBody
    public JsonResult accessDeniedExceptionHandler(AccessDeniedException e) {
        log.error("Authentication Exception", e);
        return getExceptionJsonResult(e);
    }

    // Unknown
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public JsonResult unknownExceptionHandler(Exception e) {
        log.error("Unknown Exception", e);
        return getExceptionJsonResult(e);
    }

    private String getMessageKey(FieldError e) {
        String errorCode = e.getCodes()[0];
        return errorCode;
    }

    private String getDefaultMessage(Object e) {
        String message = "";
        if (e instanceof FieldError) {
            message = ((FieldError) e).getDefaultMessage();
        } else if (e instanceof JsonResultException) {
            message = ((JsonResultException) e).getExceptionMessage();
        } else if (e instanceof AccessDeniedException) {
            message = ((AccessDeniedException) e).getLocalizedMessage();
        } else if (e instanceof Exception) {
            message = ((Exception) e).getMessage();
        }

        return message;
    }

    private String getMessage(Object e) throws Exception {
        String message = "";
        if (e instanceof FieldError) {
            message = messageAccessor.getMessage(getMessageKey((FieldError) e),
                    ((FieldError) e).getArguments(), Locale.getDefault());
        } else if (e instanceof JsonResultException) {
            message = messageAccessor.getMessage(((JsonResultException) e).getMessageKey(),
                    ((JsonResultException) e).getArgs(), Locale.getDefault());
        } else if (e instanceof AccessDeniedException) {
            message = messageAccessor.getMessage(((AccessDeniedException) e).getClass().getName(),
                    "", Locale.getDefault());
        }

        return message;
    }

    private JsonResult getExceptionJsonResult(Object error) {
        String message = "";
        try {
            message = getDefaultMessage(error);
            if (message == null || "".equals(message)) {
                message = getMessage(error);
            }
        } catch (Exception e) {
            //message = ((Exception)error).getCause().getMessage();
        	message = messageAccessor.getMessage("com.mobigen.framework.exception.GlobalExceptionHandler");
        }

        JsonResult js = new JsonResult();
        js.setErrorMessage(message);

        return js;
    }

}
