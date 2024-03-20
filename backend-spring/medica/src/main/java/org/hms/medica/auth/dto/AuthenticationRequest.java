package org.hms.medica.auth.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString
public class AuthenticationRequest {

    private String email;
    private String password;
}
