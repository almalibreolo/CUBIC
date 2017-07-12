package com.mobigen.msf.login;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mobigen.framework.security.IUserModel;
import com.mobigen.framework.security.SessionManager;
import com.mobigen.msf.login.model.UserModel;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class LoginService {

    @Autowired
    private LoginMapper loginMapper;
    
    @Autowired
    private SessionManager sessionManager;
    
    public int login(UserModel userModel, HttpServletRequest request, HttpServletResponse response) {
        userModel.setUserRole("Administrator");
        
        //IUserModel user = sessionManager.auth(request, response, userModel, loginMapper);
        IUserModel user = sessionManager.testAuth(request, response, userModel, loginMapper);
        if (user == null) {
            log.error("Login Fail", userModel);
            return 0;
        }
        
        return 1;
    }
}
