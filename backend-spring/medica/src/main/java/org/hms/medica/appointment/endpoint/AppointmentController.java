package org.hms.medica.appointment.endpoint;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.hms.medica.appointment.dto.PatientAppointmentDto;
import org.hms.medica.appointment.service.AppointmentSchedulingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/appointments")
@RequiredArgsConstructor
public class AppointmentController {
  private final AppointmentSchedulingService appointmentSchedulingService;

  @PreAuthorize("hasRole('ROLE_PATIENT')")
  @PostMapping
  public ResponseEntity<String> scheduleAppointmentForCurrentUser(
      @Valid @RequestBody PatientAppointmentDto patientAppointmentDto) {
    Long appointmentId =
        appointmentSchedulingService.scheduleAppointmentForCurrentUser(patientAppointmentDto);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body("Appointment created with id " + appointmentId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PostMapping("/patients/{patientId}")
  public ResponseEntity<String> scheduleAppointmentForPatient(
      @Valid @RequestBody PatientAppointmentDto patientAppointmentDto,
      @PathVariable Long patientId) {
    System.out.println("Patient Appointment: " + patientAppointmentDto);
    Long appointmentId =
        appointmentSchedulingService.scheduleAppointmentById(patientAppointmentDto, patientId);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body("Appointment created with id " + appointmentId);
  }
}
