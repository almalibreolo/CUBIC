package com.mobigen.afnas.user;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mobigen.afnas.user.model.UserModel;
import com.mobigen.framework.annotation.transactional.WriteTransactional;
import com.mobigen.framework.result.JsonResult;
import com.mobigen.framework.security.IUserModel;
import com.mobigen.framework.security.SessionManager;
import com.mobigen.framework.util.bcrypt.CryptUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;


    @Autowired
    private SessionManager sessionManager;


    public int login(UserModel userModel, HttpServletRequest request, HttpServletResponse response)
            throws Exception {
    	
        userModel.setUserRole("Administrator");

        IUserModel user = sessionManager.auth(request, response, userModel, userMapper);
        if (user == null) {
            throw new Exception("Login Fail");
        }

        return JsonResult.RESULT_SUCCESS;
    }

    @WriteTransactional
    public int addUser(UserModel user) throws Exception {

        if (user == null) {
            return JsonResult.RESULT_FAIL;
        }

        user.setPassword(CryptUtil.hashpw(user.getPassword()));
        userMapper.addUser(user);

        return JsonResult.RESULT_SUCCESS;
    }

    @WriteTransactional
    public int updateUser(UserModel user) throws Exception {
        if (user == null) {
            return JsonResult.RESULT_FAIL;
        }

        user.setUserId(sessionManager.getUsername());
        user.setPassword(CryptUtil.hashpw(user.getPassword()));
        userMapper.updateUser(user);

        return JsonResult.RESULT_SUCCESS;
    }

    @WriteTransactional
    public int duplicateCheckUser(UserModel user) throws Exception {
        return userMapper.duplicateCheckUser(user);
    }
    
    public boolean checkEncryptPassword(String password) throws Exception{
        boolean check=false;
        UserModel model=new UserModel();        
        model.setUserId(sessionManager.getUsername());
        
        String encryptDBPass=userMapper.checkEncryptPassword(model);
        if (encryptDBPass == null || encryptDBPass == "") {
            return false;
        }
        
        log.debug("PASSWORD:" + password + " / " + encryptDBPass);
        if(password!=null){
            check=CryptUtil.checkpw(password, encryptDBPass);
        }
        
        return check;
    }
    


}
