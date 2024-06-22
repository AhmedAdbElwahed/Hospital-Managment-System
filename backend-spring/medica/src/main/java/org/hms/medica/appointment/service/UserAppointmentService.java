package org.hms.medica.appointment.service;

import org.hms.medica.appointment.model.Appointment;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.user.model.User;


import java.time.LocalTime;
import java.util.List;

public interface UserAppointmentService {
  List<Appointment> findUserAppointments(User user);

  boolean IsAppointmentByStartTimePresent(LocalTime startTime, Doctor doctor);
}
