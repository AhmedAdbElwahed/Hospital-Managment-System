package org.hms.medica.user.mapper;

import java.util.Collection;
import org.hms.medica.auth.model.Role;
import org.hms.medica.user.dto.UserResponseDto;
import org.hms.medica.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper
public abstract class UserMapper {

  @Mapping(target = "roles", expression = "java(getRole(user.getRoles()))")
  public abstract UserResponseDto userMapToDto(User user);

  String getRole(Collection<Role> role) {
    return role.stream()
        .findFirst()
        .orElseThrow(() -> new RuntimeException("Role Not Found"))
        .getName();
  }
}
