package org.hms.medica.appointment.service;

import org.hms.medica.appointment.model.Appointment;
import org.hms.medica.user.model.User;

import java.util.List;

public interface UserAppointmentService {
  List<Appointment> findUserAppointments(User user);
}