package org.hms.medica.appointment.service;

import java.time.LocalTime;
import lombok.RequiredArgsConstructor;
import org.hms.medica.appointment.exception.AppointmentAlreadyScheduledException;
import org.hms.medica.appointment.exception.InvalidAppointmentTimeSlot;
import org.hms.medica.appointment.model.Appointment;
import org.hms.medica.appointment.repository.AppointmentRepository;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.patient.model.Patient;
import org.hms.medica.user.service.UserService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppointmentValidator {
  private final AppointmentRepository appointmentRepository;
  private final UserService userService;

  public void validate(Appointment appointment) {
    validateAppointmentDateTime(appointment);
    validateIfScheduledByPatient(appointment);
    validateIfScheduledWithDoctor(appointment);
  }

  private void validateIfScheduledByPatient(Appointment appointment) {

    Patient patient = appointment.getPatient();

    appointmentRepository
        .findByPatientIdAndStartDateTime(patient.getId(), appointment.getStartDateTime())
        .ifPresent(
            appointment1 -> {
              throw new AppointmentAlreadyScheduledException(appointment1);
            });
  }

  private void validateIfScheduledWithDoctor(Appointment appointment) {
    Doctor doctor = appointment.getDoctor();

    appointmentRepository
        .findByDoctorIdAndStartDateTime(doctor.getId(), appointment.getStartDateTime())
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
    if (startTime.isAfter(appointmentStartTime)
        || endTime.isBefore(appointmentStartTime.plusMinutes(30))
        || !validMinute) {
      throw new InvalidAppointmentTimeSlot(appointment);
    }
  }
}
