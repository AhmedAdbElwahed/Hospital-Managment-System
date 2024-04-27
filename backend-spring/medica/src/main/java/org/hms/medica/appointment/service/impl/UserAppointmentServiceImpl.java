package org.hms.medica.appointment.service.impl;

import lombok.RequiredArgsConstructor;
import org.hms.medica.appointment.model.Appointment;
import org.hms.medica.appointment.repository.AppointmentRepository;
import org.hms.medica.appointment.service.UserAppointmentService;
import org.hms.medica.user.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserAppointmentServiceImpl implements UserAppointmentService {
  private final AppointmentRepository appointmentRepository;

  @Override
  public List<Appointment> findUserAppointments(User user) {
    return appointmentRepository.findAppointmentsByUserId(user.getId());
  }
}
