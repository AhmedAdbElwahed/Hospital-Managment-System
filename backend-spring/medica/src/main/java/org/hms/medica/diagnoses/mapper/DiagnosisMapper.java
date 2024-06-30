package org.hms.medica.diagnoses.mapper;

import org.hms.medica.diagnoses.dto.DiagnosisRequestDto;
import org.hms.medica.diagnoses.dto.DiagnosisResponseDto;
import org.hms.medica.diagnoses.model.Diagnosis;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper
public interface DiagnosisMapper {
    @Mapping(target = "patientId", expression = "java(diagnosis.getPatient().getId())")
    DiagnosisRequestDto mapToRequestDto(Diagnosis diagnosis);
    DiagnosisResponseDto mapToResponseDto(Diagnosis diagnosis);
    Diagnosis mapToEntity(DiagnosisRequestDto diagnosisRequestDto);
}
