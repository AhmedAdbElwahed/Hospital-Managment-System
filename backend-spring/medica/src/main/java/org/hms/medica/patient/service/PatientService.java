package org.hms.medica.patient.service;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.hms.medica.appointment.dto.PatientAppointmentDto;
import org.hms.medica.appointment.mapper.PatientAppointmentMapper;
import org.hms.medica.appointment.service.UserAppointmentService;
import org.hms.medica.user.model.User;
import org.hms.medica.user.service.UserService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientService {
  private final UserAppointmentService userAppointmentService;
  private final UserService userService;
  private final PatientAppointmentMapper patientAppointmentMapper;

  public List<PatientAppointmentDto> getAppointments() {
    User user = userService.getCurrentUser();
    return userAppointmentService.findUserAppointments(user).stream()
        .map(
            (appointment) -> {
              PatientAppointmentDto patientAppointmentDto =
                  patientAppointmentMapper.toDto(appointment);
              patientAppointmentDto.setDoctorId(appointment.getDoctor().getId());
              return patientAppointmentDto;
            })
        .collect(Collectors.toList());
  }
}
