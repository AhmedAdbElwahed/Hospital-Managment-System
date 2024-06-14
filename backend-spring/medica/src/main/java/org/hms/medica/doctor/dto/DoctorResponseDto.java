package org.hms.medica.doctor.dto;


import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString
public class DoctorResponseDto {
    private Long id;
    private RequiredInfoDto requiredInfoDto;
    private AdditionalInfoDto additionalInfoDto;
}
