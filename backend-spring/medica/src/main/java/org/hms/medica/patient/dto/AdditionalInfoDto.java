package org.hms.medica.patient.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hms.medica.constants.BloodType;
import org.hms.medica.constants.MaritalStatus;

import java.time.LocalTime;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString
public class AdditionalInfoDto {

    private String insurancePolicyNumber;
    private BloodType bloodType;
    private MaritalStatus maritalStatus;
    private String nationality;
}
