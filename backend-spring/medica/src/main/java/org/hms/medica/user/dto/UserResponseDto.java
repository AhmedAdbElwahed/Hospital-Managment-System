package org.hms.medica.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hms.medica.constants.Gender;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class UserResponseDto {

    private Long id;

    private String firstname;

    private String lastname;

    private String gender;

    private LocalDate dob;

    private String address;

    private String phone;

    private String email;

    private String roles;

    private Boolean is_enabled;
}
