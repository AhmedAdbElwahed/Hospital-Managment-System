package org.hms.medica.doctor.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hms.medica.constants.Gender;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString
public class RequiredInfoDto {

    private String firstname;
    private String lastname;
    private Gender gender;
    private LocalDate dob;
    private String address;
    private String phone;
    private String email;
    private String password;
    private Boolean is_enabled;

}
