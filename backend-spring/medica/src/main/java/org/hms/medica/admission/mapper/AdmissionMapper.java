package org.hms.medica.admission.mapper;

import org.hms.medica.admission.dto.AdmissionResponseDto;
import org.hms.medica.admission.model.Admission;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper
public interface AdmissionMapper {

  @Mapping(target = "wardId", expression = "java(admission.getWard().getId())")
  AdmissionResponseDto mapToResponseDto(Admission admission);

  @Mapping(target = "wardId", expression = "java(admission.getWard().getId())")
  AdmissionResponseDto mapToRequestDto(Admission admission);
}
