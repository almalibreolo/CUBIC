package com.mobigen.msf.login;

import org.springframework.stereotype.Repository;

import com.mobigen.framework.security.IUserDao;
import com.mobigen.framework.security.IUserModel;

@Repository("loginMapper")
public interface LoginMapper extends IUserDao {
    IUserModel getUser(IUserModel user) throws Exception;
}
