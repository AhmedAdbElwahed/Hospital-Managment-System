package org.hms.medica.admission.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hms.medica.constants.AdmissionType;

@Setter
@Getter
public class AdmissionRequestDto {
    @NotNull
    private Long patientId;
    @NotNull
    private AdmissionType admissionType;
    @NotNull
    private String wardName;

    private String diagnosisIn;

    private String diagnosisOut;
}
