package org.hms.medica.patient.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString
public class PatientDto {

    private RequiredInfoDto requiredInfoDto;
    private AdditionalInfoDto additionalInfoDto;
}
