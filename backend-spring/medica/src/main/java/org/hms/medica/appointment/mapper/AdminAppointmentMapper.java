package org.hms.medica.appointment.mapper;

import org.hms.medica.appointment.dto.AppointmentResponseDto;
import org.hms.medica.appointment.model.Appointment;
import org.hms.medica.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface AdminAppointmentMapper {

    @Mapping(target = "doctorName", expression = "java(getFullName(appointment.getDoctor()))")
    @Mapping(target = "patientName", expression = "java(getFullName(appointment.getPatient()))")
    @Mapping(target = "isVirtual", source = "virtual")
    AppointmentResponseDto mapAppointmentToAppointmentResponseDto(Appointment appointment);

    default String getFullName(User user) {
        return String.format("%s %s", user.getFirstname(), user.getLastname());
    }
}
