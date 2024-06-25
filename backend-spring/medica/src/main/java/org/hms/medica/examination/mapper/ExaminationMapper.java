package org.hms.medica.examination.mapper;

import lombok.RequiredArgsConstructor;
import org.hms.medica.examination.dto.ExaminationDto;
import org.hms.medica.examination.model.Examination;
import org.hms.medica.patient.model.Patient;
import org.hms.medica.patient.service.PatientService;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
@RequiredArgsConstructor
public abstract class ExaminationMapper {

  @Autowired private PatientService patientService;

  @Mapping(target = "patient", ignore = true)
  public abstract Examination mapToEntity(ExaminationDto examinationDto);

  public abstract ExaminationDto mapToDto(Examination examination);

  @AfterMapping
  protected void mapPatientIdToPatient(
      ExaminationDto examinationDto, @MappingTarget Examination examination) {
    if (examinationDto.getPatientId() != null) {
      Patient patient = patientService.getPatientById(examinationDto.getPatientId());
      examination.setPatient(patient);
    }
  }
}