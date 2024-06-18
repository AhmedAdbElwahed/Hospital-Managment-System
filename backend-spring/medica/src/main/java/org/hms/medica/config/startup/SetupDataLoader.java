package org.hms.medica.config.startup;

import lombok.RequiredArgsConstructor;
import org.hms.medica.auth.model.Role;
import org.hms.medica.auth.repo.RoleRepository;
import org.hms.medica.user.model.User;
import org.hms.medica.user.repo.UserRepository;
import org.hms.medica.user.service.UserService;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {

    boolean alreadySetup = false;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (alreadySetup) return;

        Role adminRole = createRoleIfNotFound("ROLE_ADMIN");
        createRoleIfNotFound("ROLE_DOCTOR");
        createRoleIfNotFound("ROLE_PATIENT");
//        createRoleIfNotFound("ROLE_USER", null);

        User user = userRepository.findUserByEmail("admin@gmail.com").orElse(null);
        if (user == null) {
            //create admin
            user = User.builder()
                    .firstname("Super")
                    .lastname("User")
                    .password(passwordEncoder.encode("ChangeMe"))
                    .email("admin@gmail.com")
                    .is_enabled(true)
                    .roles(List.of(adminRole))
                    .build();
            userRepository.save(user);
        }
        alreadySetup = true;
    }


    Role createRoleIfNotFound(
            String name) {
        Role role = roleRepository.getRoleByName(name).orElse(null);
        if (role == null) {
            role = new Role();
            role.setName(name);
            roleRepository.save(role);
        }
        return role;
    }


}
