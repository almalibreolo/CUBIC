package com.mobigen.afnas.user;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mobigen.afnas.user.model.UserModel;
import com.mobigen.framework.result.JsonResult;
import com.mobigen.framework.security.SessionManager;
import com.mobigen.msf.login.LoginController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/index")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private MessageSourceAccessor messageAccessor;

    @Autowired
    private SessionManager sessionManager;

    @RequestMapping(value = "/login.do")
    @ResponseBody
    public JsonResult login(@RequestBody UserModel userModel, HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        JsonResult js = new JsonResult();
        js.setResult(userService.login(userModel, request, response));

        return js;
    }

    @RequestMapping(value = "/getUser.json")
    @ResponseBody
    public JsonResult getUser(HttpServletRequest request, HttpServletResponse response) {
        JsonResult js = new JsonResult();
        js.setData(sessionManager.getUser());
        return js;
    }

    @RequestMapping(value = "/addUser.json")
    @ResponseBody
    public JsonResult addUser(@RequestBody UserModel user) throws Exception {
        JsonResult js = new JsonResult();
        int check = userService.duplicateCheckUser(user);


        if (check == 1) {
            throw new Exception("This ID is already registered. Please enter a different ID.");
        } else {
            js.setData(userService.addUser(user));
        }

        return js;
    }


    @RequestMapping(value = "/updateUser.json")
    @ResponseBody
    public JsonResult updateUser(@RequestBody UserModel user) throws Exception {
        JsonResult js = new JsonResult();
        js.setData(userService.updateUser(user));
        return js;
    }

    @RequestMapping(value = "/checkPassword.json")
    @ResponseBody
    public JsonResult checkPassword(@RequestBody String password) throws Exception {
        JsonResult js = new JsonResult();
        boolean check=userService.checkEncryptPassword(password);
        
        if (check == false) {
            throw new Exception("Password do not match.");
        } else {
           js.setData(check);
        }
        
        return js;
    }
}
