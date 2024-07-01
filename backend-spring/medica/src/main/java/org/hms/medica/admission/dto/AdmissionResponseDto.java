package org.hms.medica.admission.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hms.medica.constants.AdmissionType;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@Builder
public class AdmissionResponseDto {
  private Long id;
  private String diagnosisOut;

  private String diagnosisIn;

  private AdmissionType admissionType;

  private LocalDateTime dischargeDate;
  private Integer numOfBedDays;
  private String patientName;
  private String doctorName;
  private String wardName;
}
