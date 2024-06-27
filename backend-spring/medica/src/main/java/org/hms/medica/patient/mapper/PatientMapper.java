package org.hms.medica.patient.mapper;

import org.hms.medica.patient.dto.AdditionalInfoDto;
import org.hms.medica.patient.dto.PatientDto;
import org.hms.medica.patient.dto.PatientResponseDto;
import org.hms.medica.patient.dto.RequiredInfoDto;
import org.hms.medica.patient.model.Patient;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper
public interface PatientMapper {

    @Mapping(target = "requiredInfoDto", expression = "java(mapPatientToRequiredInfoDto(patient))")
    @Mapping(target = "additionalInfoDto", expression = "java(mapPatientToAdditionalInfoDto(patient))")
    @Mapping(target = "patientHistoryId", expression = "java(patient.getPatientHistory() != null ? patient.getPatientHistory().getId() : null)")
    PatientResponseDto mapPatientToPatientResponseDto(Patient patient);


    @Mapping(target = "bloodType", source = "additionalInfoDto.bloodType")
    @Mapping(target = "nationality", source = "additionalInfoDto.nationality")
    @Mapping(target = "insurancePolicyNumber", source = "additionalInfoDto.insurancePolicyNumber")
    @Mapping(target = "maritalStatus", source = "additionalInfoDto.maritalStatus")
    @Mapping(target = "firstname", source = "requiredInfoDto.firstname")
    @Mapping(target = "lastname", source = "requiredInfoDto.lastname")
    @Mapping(target = "address", source = "requiredInfoDto.address")
    @Mapping(target = "email", source = "requiredInfoDto.email")
    @Mapping(target = "dob", source = "requiredInfoDto.dob")
    @Mapping(target = "gender", source = "requiredInfoDto.gender")
    @Mapping(target = "phone", source = "requiredInfoDto.phone")
    @Mapping(target = "is_enabled", source = "requiredInfoDto.is_enabled")
    @Mapping(target = "password", source = "requiredInfoDto.password")
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "patientHistory", ignore = true)
    @Mapping(target = "admissions", ignore = true)
    @Mapping(target = "appointment", ignore = true)
    @Mapping(target = "diagnoses", ignore = true)
    @Mapping(target = "medications", ignore = true)
    @Mapping(target = "ward", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "roles", ignore = true)
    Patient mapPatientDtoToPatient(PatientDto patientDto);


    @Mapping(source = "requiredInfoDto.firstname", target = "firstname")
    @Mapping(source = "requiredInfoDto.lastname", target = "lastname")
    @Mapping(source = "requiredInfoDto.gender", target = "gender")
    @Mapping(source = "requiredInfoDto.dob", target = "dob")
    @Mapping(source = "requiredInfoDto.address", target = "address")
    @Mapping(source = "requiredInfoDto.phone", target = "phone")
    @Mapping(source = "requiredInfoDto.email", target = "email")
    @Mapping(source = "requiredInfoDto.password", target = "password")
    @Mapping(source = "requiredInfoDto.is_enabled", target = "is_enabled")
    @Mapping(source = "additionalInfoDto.insurancePolicyNumber", target = "insurancePolicyNumber")
    @Mapping(source = "additionalInfoDto.bloodType", target = "bloodType")
    @Mapping(source = "additionalInfoDto.maritalStatus", target = "maritalStatus")
    @Mapping(source = "additionalInfoDto.nationality", target = "nationality")
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "patientHistory", ignore = true)
    @Mapping(target = "admissions", ignore = true)
    @Mapping(target = "appointment", ignore = true)
    @Mapping(target = "diagnoses", ignore = true)
    @Mapping(target = "medications", ignore = true)
    @Mapping(target = "ward", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "roles", ignore = true)
    void updatePatientFromDto(PatientDto patientDto, @MappingTarget Patient patient);

    AdditionalInfoDto mapPatientToAdditionalInfoDto(Patient patient);
    RequiredInfoDto mapPatientToRequiredInfoDto(Patient patient);



}
