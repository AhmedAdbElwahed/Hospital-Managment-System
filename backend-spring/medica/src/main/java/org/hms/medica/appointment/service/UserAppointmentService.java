package org.hms.medica.appointment.service;

import com.querydsl.core.types.Predicate;
import org.hms.medica.appointment.dto.AppointmentResponseDto;
import org.hms.medica.appointment.model.Appointment;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.user.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalTime;
import java.util.List;

public interface UserAppointmentService {
  List<Appointment> findUserAppointments(User user);

  boolean IsAppointmentByStartTimePresent(LocalTime startTime, Doctor doctor);

  List<AppointmentResponseDto> findAllAppointments(Predicate predicate, Pageable pageable);

  @Transactional
  void deleteAppointment(Long id);
}
