package com.mobigen.afnas.user;

import org.springframework.stereotype.Repository;

import com.mobigen.afnas.user.model.UserModel;
import com.mobigen.framework.security.IUserDao;
import com.mobigen.framework.security.IUserModel;

@Repository("userMapper")
public interface UserMapper extends IUserDao {
    public UserModel getUser(IUserModel user) throws Exception;

    public int addUser(UserModel user) throws Exception;

    public int duplicateCheckUser(UserModel user) throws Exception;

    public int updateUser(UserModel user) throws Exception;
    
    public String checkEncryptPassword(UserModel user)throws Exception;

}
