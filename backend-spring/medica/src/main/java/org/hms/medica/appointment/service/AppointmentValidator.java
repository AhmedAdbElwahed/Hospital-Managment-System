package org.hms.medica.appointment.service;

import java.time.LocalTime;
import lombok.RequiredArgsConstructor;
import org.hms.medica.appointment.exception.AppointmentAlreadyScheduledException;
import org.hms.medica.appointment.exception.InvalidAppointmentTimeSlot;
import org.hms.medica.appointment.model.Appointment;
import org.hms.medica.appointment.repository.AppointmentRepository;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.patient.model.Patient;
import org.hms.medica.user.model.User;
import org.hms.medica.user.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppointmentValidator {
  private final AppointmentRepository appointmentRepository;
  private final UserService userService;

  public void validate(Appointment appointment) {
    validateAppointmentDateTime(appointment);
    validateIfScheduled(appointment);
  }

  private void validateIfScheduled(Appointment appointment) {

    Patient patient = appointment.getPatient();

    appointmentRepository
        .findByPatientIdAndStartDateTime(patient.getId(), appointment.getStartDateTime())
        .ifPresent(
            appointment1 -> {
              throw new AppointmentAlreadyScheduledException(appointment1);
            });
  }

  private void validateAppointmentDateTime(Appointment appointment) {
    Doctor doctor = appointment.getDoctor();
    LocalTime startTime = doctor.getWorkStartTime();
    LocalTime endTime = doctor.getWorkEndTime();
    LocalTime appointmentStartTime = appointment.getStartDateTime().toLocalTime();
    boolean validMinute =
        appointmentStartTime.getMinute() == 0 || appointmentStartTime.getMinute() == 30;
    if (startTime.isAfter(appointmentStartTime.minusMinutes(20))
        || endTime.isBefore(appointmentStartTime.plusMinutes(20))
        || !validMinute) {
      throw new InvalidAppointmentTimeSlot(appointment);
    }
  }
}
