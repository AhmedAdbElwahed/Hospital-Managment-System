package org.hms.medica.diagnoses.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString
public class DiagnosisResponseDto {
    private String details;
}
