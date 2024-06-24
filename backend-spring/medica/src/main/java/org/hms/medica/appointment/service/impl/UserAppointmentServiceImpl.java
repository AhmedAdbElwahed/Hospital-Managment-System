package org.hms.medica.appointment.service.impl;

import com.querydsl.core.types.Predicate;
import lombok.RequiredArgsConstructor;
import org.hms.medica.appointment.dto.AppointmentResponseDto;
import org.hms.medica.appointment.mapper.AdminAppointmentMapper;
import org.hms.medica.appointment.model.Appointment;
import org.hms.medica.appointment.repository.AppointmentRepository;
import org.hms.medica.appointment.service.UserAppointmentService;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.user.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserAppointmentServiceImpl implements UserAppointmentService {
  private final AppointmentRepository appointmentRepository;
  private final AdminAppointmentMapper adminAppointmentMapper;

  @Override
  public List<Appointment> findUserAppointments(User user) {
    return appointmentRepository.findAppointmentsByUserId(user.getId());
  }

  @Override
  public boolean IsAppointmentByStartTimePresent(LocalTime startTime, Doctor doctor) {
    return appointmentRepository.findAppointmentByStartTimeAndDoctor(startTime, doctor).isPresent();
  }

  @Override
  public List<AppointmentResponseDto> findAllAppointments(Predicate predicate, Pageable pageable) {
    return appointmentRepository.findAll(predicate, pageable).stream()
            .map(adminAppointmentMapper::mapAppointmentToAppointmentResponseDto)
            .toList();
  }

  @Override
  public void deleteAppointment(Long id) {
    appointmentRepository.deleteById(id);
  }
}
