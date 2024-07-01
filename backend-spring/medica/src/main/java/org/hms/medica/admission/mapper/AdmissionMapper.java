package org.hms.medica.admission.mapper;

import org.hms.medica.admission.dto.AdmissionResponseDto;
import org.hms.medica.admission.model.Admission;
import org.hms.medica.diagnoses.model.Diagnosis;
import org.hms.medica.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;


@Mapper
public interface AdmissionMapper {


//    @Mapping(target = "patientId", ignore = true)
//    @Mapping(source = "ward.name", target = "wardName")
//    @Mapping(target = "admissionType", source = "admissionType")
//    @Mapping(target = "dischargeType", source = "admissionType")
//    AdmissionResponseDto toDto(Admission admission);



  @Mapping(target = "wardName", source = "ward.name")
  @Mapping(target = "doctorName", expression = "java(getFullName(admission.getDoctor()))")
  @Mapping(target = "patientName", expression = "java(getFullName(admission.getPatient()))")
  AdmissionResponseDto mapToResponseDto(Admission admission);

  default String getFullName(User user) {
    return String.format("%s %s", user.getFirstname(), user.getLastname());
  }

}
