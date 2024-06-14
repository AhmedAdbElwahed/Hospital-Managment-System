package org.hms.medica.doctor.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalTime;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString
public class AdditionalInfoDto {

    private String education;
    private String certifications;
    private String experience;
    private boolean activeStatus;
    private String specialty;
    private String licenseNumber;
    private LocalTime workStartTime;
    private LocalTime workEndTime;
}
