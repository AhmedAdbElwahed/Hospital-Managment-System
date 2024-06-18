package org.hms.medica.auth.service;

import lombok.RequiredArgsConstructor;
import org.hms.medica.auth.exception.RoleNotFoundException;
import org.hms.medica.auth.model.Role;
import org.hms.medica.auth.repo.RoleRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;

    public Role findByName(String roleName) {
        return roleRepository.getRoleByName(roleName)
                .orElseThrow(() -> new RoleNotFoundException(roleName));
    }
}
