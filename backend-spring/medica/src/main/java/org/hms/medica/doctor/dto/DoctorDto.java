package org.hms.medica.doctor.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString
public class DoctorDto {

    private RequiredInfoDto requiredInfoDto;
    private AdditionalInfoDto additionalInfoDto;
}
