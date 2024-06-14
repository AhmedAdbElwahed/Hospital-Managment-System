package org.hms.medica.doctor.mapper;


import org.hms.medica.doctor.dto.AdditionalInfoDto;
import org.hms.medica.doctor.dto.DoctorResponseDto;
import org.hms.medica.doctor.dto.RequiredInfoDto;
import org.hms.medica.doctor.model.Doctor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper
public interface DoctorMapper {

    @Mapping(target = "requiredInfoDto", expression = "java(mapDoctorToRequiredInfoDto(doctor))")
    @Mapping(target = "additionalInfoDto", expression = "java(mapDoctorToAdditionalInfoDto(doctor))")
    DoctorResponseDto mapDoctorToDoctorResponseDto(Doctor doctor);

    AdditionalInfoDto mapDoctorToAdditionalInfoDto(Doctor doctor);
    RequiredInfoDto mapDoctorToRequiredInfoDto(Doctor doctor);
}
