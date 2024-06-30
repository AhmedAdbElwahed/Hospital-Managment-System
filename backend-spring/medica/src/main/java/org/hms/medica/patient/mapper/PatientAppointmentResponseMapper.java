package org.hms.medica.patient.mapper;

import org.hms.medica.appointment.dto.PatientAppointmentDto;
import org.hms.medica.appointment.model.Appointment;
import org.hms.medica.patient.dto.PatientAppointmentResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper
public interface PatientAppointmentResponseMapper {

  Appointment mapToEntity(PatientAppointmentResponseDto patientAppointmentResponseDto);

  @Mapping(target = "doctorId", expression = "java(appointment.getDoctor().getId())")
  @Mapping(target = "isVirtual", source = "virtual")
  PatientAppointmentResponseDto mapToDto(Appointment appointment);
}
