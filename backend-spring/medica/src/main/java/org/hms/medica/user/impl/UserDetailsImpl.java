package org.hms.medica.user.impl;

import lombok.Getter;
import lombok.Setter;
import org.hms.medica.auth.model.Role;
import org.hms.medica.user.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;

@Getter
@Setter
public class UserDetailsImpl implements UserDetails {

    private String username;
    private String firstname;
    private String lastname;
    private String password;
    private Boolean enabled;
    private Collection<Role> roles;

    public UserDetailsImpl(User user) {
        this.username = user.getEmail();
        this.password = user.getPassword();
        this.enabled = user.getIs_enabled();
        this.lastname = user.getLastname();
        this.firstname = user.getFirstname();
        this.roles = user.getRoles();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map((role -> new SimpleGrantedAuthority(role.getName())))
                .toList();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public String getFullName() {
        return String.format("%s %s", this.firstname, this.lastname);
    }
}
