package org.hms.medica.appointment.mapper;

import org.hms.medica.appointment.dto.DoctorAppointmentDto;
import org.hms.medica.appointment.model.Appointment;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper
public interface DoctorAppointmentMapper {
  Appointment toEntity(DoctorAppointmentDto userAppointmentDto);

  DoctorAppointmentDto toDto(Appointment appointment);
}
