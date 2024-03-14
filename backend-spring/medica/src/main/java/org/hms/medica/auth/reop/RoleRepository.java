package org.hms.medica.auth.reop;

import org.hms.medica.auth.model.Role;
import org.hms.medica.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> getRoleByName(String roleName);
    List<Role> findAllByUsers(Collection<User> users);
}
