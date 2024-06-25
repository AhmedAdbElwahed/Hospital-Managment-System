package org.hms.medica.patienthistory.mapper;

import org.hms.medica.patienthistory.dto.PatientHistoryDto;
import org.hms.medica.patienthistory.model.PatientHistory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper
public interface PatientHistoryMapper {

    @Mapping(target = "patientId", expression = "java(patientHistory.getPatient().getId())")
    PatientHistoryDto mapPatientHistoryToPatientHistoryDto(PatientHistory patientHistory);

    @Mapping(target = "patient", ignore = true)
    PatientHistory mapPatientHistoryDtoToPatientHistory(PatientHistoryDto patientHistoryDto);

    @Mapping(target = "patient", ignore = true)
    @Mapping(target = "id", ignore = true)
    void updatePatientHistory(PatientHistoryDto patientHistoryDto,@MappingTarget PatientHistory patientHistory);
}
