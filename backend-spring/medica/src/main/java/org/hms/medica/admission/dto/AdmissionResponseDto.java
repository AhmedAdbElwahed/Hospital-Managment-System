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

    private String diagnosisOutDetails;

    private String diagnosisInDetails;

    private AdmissionType admissionType;

    private AdmissionType dischargeType;

    private LocalDateTime dischargeDate;

    private int bedDays;

    private Long patientId;

    private String wardName;

    private String diagnosisIn;

    private String diagnosisOut;
}
