package org.hms.medica.admission.dto;

import lombok.Getter;
import lombok.Setter;
import org.hms.medica.constants.AdmissionType;

import java.time.LocalDateTime;

@Setter
@Getter
public class AdmissionResponseDto {
  private Long id;
  private String diagnosisOut;

  private String diagnosisIn;

  private AdmissionType admissionType;

  private AdmissionType dischargeType;

  private LocalDateTime dischargeDate;
  private Integer numOfBedDays;
  private Long patientId;
  private Long doctorId;
  private Long wardId;
}
