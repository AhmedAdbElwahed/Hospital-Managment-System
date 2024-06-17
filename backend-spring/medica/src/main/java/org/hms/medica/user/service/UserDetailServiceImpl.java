package org.hms.medica.user.service;

import lombok.AllArgsConstructor;
import org.hms.medica.user.impl.UserDetailsImpl;
import org.hms.medica.auth.model.Role;
import org.hms.medica.auth.reop.RoleRepository;
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


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        var user =  userRepository.findUserByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException(String.format("User With This Email %s Not Found", email)));

        return new UserDetailsImpl(user);

    }
}
