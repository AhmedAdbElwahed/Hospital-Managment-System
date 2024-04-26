package org.hms.medica.appointment.mapper;

import org.hms.medica.appointment.dto.AppointmentDto;
import org.hms.medica.appointment.model.Appointment;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper
public interface AppointmentMapper {
  Appointment toEntity(AppointmentDto appointmentDto);

  AppointmentDto toDto(Appointment appointment);
}
