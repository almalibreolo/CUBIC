package com.mobigen.afnas.user.model;

import java.sql.Date;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.mobigen.framework.security.IUserModel;

import lombok.Data;

@SuppressWarnings("serial")
@Data
public class UserModel implements IUserModel {
    private String username = "";
    private String userpass = "";
    private String userRole = "";

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    public String getPassword() {
        return userpass;
    }

    public void setPassword(String value) {
        userpass = value;
    }

    public boolean isAccountNonExpired() {
        return false;
    }

    public boolean isAccountNonLocked() {
        return false;
    }

    public boolean isCredentialsNonExpired() {
        return false;
    }

    public boolean isEnabled() {
        return false;
    }

    // USER-ROLE
    public String getUserRole() {
        if (null == userRole || "".equals(userRole)) {
            return "Engineer";
        }

        return userRole;
    }

    // TROI-USER
    private String userId = "";

    public void setUserId(String value) {
        userId = value;
        username = value;
    }

    public String getUserId() {
        return userId;
    }

    // AFNAS-USER

    private String pwd = "";
    private String name = "";
    private int commandAuthor = 1;
    private String email = "";
    private String mobilephone = "";
    private String telephone = "";
    private Date regDt = null;
    private String descr = "";


}
