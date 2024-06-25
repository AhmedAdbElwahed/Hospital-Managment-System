package org.hms.medica.appointment.mapper;

import org.hms.medica.appointment.dto.DoctorAppointmentDto;
import org.hms.medica.appointment.model.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper
public interface DoctorAppointmentMapper {
  @Mapping(target = "appointmentStatus", ignore = true)
  @Mapping(target = "patient", ignore = true)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "doctor", ignore = true)
  @Mapping(target = "createdDate", ignore = true)
  @Mapping(target = "createdBy", ignore = true)
  Appointment toEntity(DoctorAppointmentDto userAppointmentDto);

  @Mapping(target = "patientId", expression = "java(appointment.getPatient().getId())")
  @Mapping(target = "isVirtual", source = "virtual")
  DoctorAppointmentDto toDto(Appointment appointment);
}
