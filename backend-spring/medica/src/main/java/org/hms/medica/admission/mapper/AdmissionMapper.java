package org.hms.medica.admission.mapper;

import org.hms.medica.admission.dto.AdmissionResponseDto;
import org.hms.medica.admission.model.Admission;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper
public interface AdmissionMapper {

    @Mapping(source = "diagnosisOut.details", target = "diagnosisOutDetails")
    @Mapping(source = "diagnosisIn.details", target = "diagnosisInDetails")
    @Mapping(source = "ward.name", target = "wardName")
    AdmissionResponseDto toDto(Admission admission);
}
