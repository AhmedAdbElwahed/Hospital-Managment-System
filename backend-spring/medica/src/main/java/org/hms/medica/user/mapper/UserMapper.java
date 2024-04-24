package org.hms.medica.user.mapper;

import org.hms.medica.auth.model.Role;
import org.hms.medica.user.dto.UserRequestDto;
import org.hms.medica.user.dto.UserResponseDto;
import org.hms.medica.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Collection;

@Mapper
public abstract class UserMapper {

    @Mapping(target = "roles", expression = "java(getRole(user.getRoles()))")
    public abstract UserResponseDto userMapToDto(User user);


    String getRole(Collection<Role> role) {
        return role.stream().findFirst().orElseThrow(() -> new RuntimeException("Role Not Found")).getName();
    }
}
