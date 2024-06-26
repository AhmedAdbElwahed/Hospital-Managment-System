package org.hms.medica.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminResetPassword {
    private String email;
    private String oldPassword;
    private String newPassword;
}
