package org.hms.medica.appointment.mapper;

import org.hms.medica.appointment.dto.PatientAppointmentDto;
import org.hms.medica.appointment.model.Appointment;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper
public interface PatientAppointmentMapper {

  Appointment toEntity(PatientAppointmentDto patientAppointmentDto);

  PatientAppointmentDto toDto(Appointment appointment);
}
