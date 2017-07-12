package com.mobigen.msf.login.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import com.mobigen.framework.security.IUserModel;

import lombok.Data;

@SuppressWarnings("serial")
@Data
public class UserModel implements IUserModel {
    private String username = "";
    private String password = "";
    private String userRole = "";
    
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
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
}
