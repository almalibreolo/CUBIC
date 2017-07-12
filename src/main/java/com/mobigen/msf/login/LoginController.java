package com.mobigen.msf.login;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mobigen.framework.result.JsonResult;
import com.mobigen.msf.login.model.UserModel;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @RequestMapping(value = "/login")
    @ResponseBody
    public JsonResult login(@RequestBody UserModel model, HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        JsonResult js = new JsonResult();
        js.setResult(loginService.login(model, request, response));
        return js;
    }
}
