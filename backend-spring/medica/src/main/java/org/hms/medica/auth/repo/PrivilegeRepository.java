package org.hms.medica.auth.repo;

import org.hms.medica.auth.model.Privilege;
import org.hms.medica.auth.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;


@Repository
public interface PrivilegeRepository extends JpaRepository<Privilege, Long> {
    Optional<Privilege> getPrivilegeByName(String privilegeName);
    List<Privilege> findAllByRoles(Collection<Role> roles);
}
