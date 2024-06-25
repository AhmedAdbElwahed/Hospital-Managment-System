package org.hms.medica.appointment.mapper;

import org.hms.medica.appointment.dto.PatientAppointmentDto;
import org.hms.medica.appointment.model.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper
public interface PatientAppointmentMapper {


  @Mapping(target = "patient", ignore = true)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "doctor", ignore = true)
  @Mapping(target = "createdDate", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  Appointment toEntity(PatientAppointmentDto patientAppointmentDto);

  @Mapping(target = "doctorId", expression = "java(appointment.getDoctor().getId())")
  @Mapping(target = "isVirtual", source = "virtual")
  PatientAppointmentDto toDto(Appointment appointment);
}
