package org.hms.medica.diagnoses.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString
public class DiagnosisRequestDto {

  private String details;
  private Long patientId;
}
