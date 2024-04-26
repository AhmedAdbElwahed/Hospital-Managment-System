package org.hms.medica.appointment.exception;

import org.hms.medica.appointment.model.Appointment;

public class AppointmentAlreadyScheduledException extends RuntimeException {
  public AppointmentAlreadyScheduledException(Appointment appointment) {
    super(String.format("Appointment is already scheduled with id = %s", appointment.getId()));
  }
}
