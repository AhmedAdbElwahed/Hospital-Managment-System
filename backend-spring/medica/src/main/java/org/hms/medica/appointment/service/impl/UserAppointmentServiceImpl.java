package org.hms.medica.appointment.service.impl;

import lombok.RequiredArgsConstructor;
import org.hms.medica.appointment.model.Appointment;
import org.hms.medica.appointment.repository.AppointmentRepository;
import org.hms.medica.appointment.service.UserAppointmentService;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.user.model.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserAppointmentServiceImpl implements UserAppointmentService {
  private final AppointmentRepository appointmentRepository;

  @Override
  public List<Appointment> findUserAppointments(User user) {
    return appointmentRepository.findAppointmentsByUserId(user.getId());
  }

  @Override
  public boolean IsAppointmentByStartTimePresent(LocalTime startTime, Doctor doctor) {
    return appointmentRepository.findAppointmentByStartTimeAndDoctor(startTime, doctor).isPresent();
  }
}
