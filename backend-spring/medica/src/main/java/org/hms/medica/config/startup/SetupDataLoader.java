package org.hms.medica.config.startup;

import lombok.RequiredArgsConstructor;
import org.hms.medica.auth.model.Privilege;
import org.hms.medica.auth.model.Role;
import org.hms.medica.auth.reop.PrivilegeRepository;
import org.hms.medica.auth.reop.RoleRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Component
@RequiredArgsConstructor
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {

    boolean alreadySetup = false;
    private final RoleRepository roleRepository;
    private final PrivilegeRepository privilegeRepository;


    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (alreadySetup) return;
        Privilege readPrivilege
                = createPrivilegeIfNotFound("READ");
        Privilege writePrivilege
                = createPrivilegeIfNotFound("WRITE");
        Privilege updatePrivilege
                = createPrivilegeIfNotFound("UPDATE");
        Privilege deletePrivilege
                = createPrivilegeIfNotFound("DELETE");
        List<Privilege> privileges = Arrays.asList(readPrivilege, writePrivilege, updatePrivilege, deletePrivilege);
        createRoleIfNotFound("ROLE_ADMIN", privileges);
        createRoleIfNotFound("ROLE_DOCTOR", privileges);
        createRoleIfNotFound("ROLE_PATIENT", privileges);
        createRoleIfNotFound("ROLE_USER", privileges);

        alreadySetup = true;
    }

    Privilege createPrivilegeIfNotFound(String name) {
        Privilege privilege = privilegeRepository.getPrivilegeByName(name).orElse(null);
        if (privilege == null) {
            privilege = new Privilege();
            privilege.setName(name);
            privilegeRepository.save(privilege);
        }
        return privilege;
    }

    Role createRoleIfNotFound(
            String name, Collection<Privilege> privileges) {
        Role role = roleRepository.getRoleByName(name).orElse(null);
        if (role == null) {
            role = new Role();
            role.setName(name);
            role.setPrivileges(privileges);
            roleRepository.save(role);
        }
        return role;
    }



}
