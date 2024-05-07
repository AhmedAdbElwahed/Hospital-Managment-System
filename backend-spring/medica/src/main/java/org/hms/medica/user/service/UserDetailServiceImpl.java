package org.hms.medica.user.service;

import lombok.AllArgsConstructor;
import org.hms.medica.user.impl.UserDetailsImpl;
import org.hms.medica.auth.model.Privilege;
import org.hms.medica.auth.model.Role;
import org.hms.medica.auth.repo.PrivilegeRepository;
import org.hms.medica.auth.repo.RoleRepository;
import org.hms.medica.user.repo.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service("userDetailsService")
@Transactional
@AllArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PrivilegeRepository privilegeRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        var user =  userRepository.findUserByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException(String.format("User With This Email %s Not Found", email)));

        var userDetail = new UserDetailsImpl(user);
        userDetail.setAuthorities(getAuthorities(user.getRoles()));
        return userDetail;

    }

    private Collection<GrantedAuthority> getAuthorities(
            Collection<Role> roles) {
        return getGrantedAuthorities(getPrivileges(roles));
    }

    private List<String> getPrivileges(Collection<Role> roles) {

        List<String> privileges = new ArrayList<>();
        for (Role role : roles) {
            privileges.add(role.getName());
            for (Privilege item : role.getPrivileges()) {
                privileges.add(item.getName());
            }
        }

        return privileges;
    }

    private List<GrantedAuthority> getGrantedAuthorities(List<String> privileges) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (String privilege : privileges) {
            authorities.add(new SimpleGrantedAuthority(privilege));
        }
        return authorities;
    }
}
