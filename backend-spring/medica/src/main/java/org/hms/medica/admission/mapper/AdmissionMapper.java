package org.hms.medica.admission.mapper;

import org.hms.medica.admission.dto.AdmissionResponseDto;
import org.hms.medica.admission.model.Admission;
import org.hms.medica.diagnoses.model.Diagnosis;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;


@Mapper
public interface AdmissionMapper {

    @Mapping(target = "patientId", ignore = true)
    @Mapping(target = "diagnosisOutDetails", expression = "java(diagnosisToString(admission.getDiagnosisOut()))")
    @Mapping(target = "diagnosisInDetails", expression = "java(diagnosisToString(admission.getDiagnosisIn()))")
    @Mapping(source = "ward.name", target = "wardName")
    AdmissionResponseDto toDto(Admission admission);

    default String diagnosisToString (Diagnosis diagnosis) {
        return diagnosis.getDetails();
    }
}
