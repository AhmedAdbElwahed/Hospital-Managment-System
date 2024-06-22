package org.hms.medica.appointment.exception;

import org.hms.medica.appointment.model.Appointment;

public class InvalidAppointmentTimeSlot extends RuntimeException {
  public InvalidAppointmentTimeSlot(Appointment appointment) {
    super(
        String.format(
            "Invalid appointment timeSlot for appointment with start datetime = %s",
            appointment.getStartTime()));
  }
}
