package org.hms.medica.appointment.endpoint;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.hms.medica.appointment.dto.PatientAppointmentDto;
import org.hms.medica.appointment.service.AppointmentSchedulingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/appointments")
@RequiredArgsConstructor
public class AppointmentController {
  private final AppointmentSchedulingService appointmentSchedulingService;

  @PostMapping
  public ResponseEntity<String> scheduleAppointment(
      @Valid @RequestBody PatientAppointmentDto patientAppointmentDto) {
    Long appointmentId = appointmentSchedulingService.scheduleAppointment(patientAppointmentDto);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body("Appointment created with id " + appointmentId);
  }
}
