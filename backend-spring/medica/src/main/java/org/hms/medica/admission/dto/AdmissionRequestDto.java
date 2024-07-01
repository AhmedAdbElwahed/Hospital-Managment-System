package org.hms.medica.admission.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hms.medica.constants.AdmissionType;
import org.hms.medica.diagnoses.dto.DiagnosisRequestDto;
import org.hms.medica.diagnoses.model.Diagnosis;

import java.time.LocalDate;

@Setter
@Getter
public class AdmissionRequestDto {
  @NotNull private Long patientId;
  @NotNull private AdmissionType admissionType;
  @NotNull private Long wardId;
  private String diagnosisIn;
  private String diagnosisOut;
  private LocalDate admissionDate;
  private LocalDate dischargeDate;
  private Integer numOfBedDays;
}
