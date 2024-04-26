package org.hms.medica.appointment.endpoint;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.hms.medica.appointment.dto.AppointmentDto;
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
      @Valid @RequestBody AppointmentDto appointmentDto) {
    Long appointmentId = appointmentSchedulingService.scheduleAppointment(appointmentDto);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body("Appointment created with id " + appointmentId);
  }

  @GetMapping("/{patientId}")
  public ResponseEntity<?> findPatientAppointments(@NotNull @PathVariable Long patientId) {
    List<AppointmentDto> appointmentDtos =
        appointmentSchedulingService.findPatientAppointments(patientId);
    return ResponseEntity.ok(appointmentDtos);
  }

  @GetMapping("/{doctorId}")
  public ResponseEntity<?> findDoctorAppointments(@NotNull @PathVariable Long doctorId) {
    List<AppointmentDto> appointmentDtos =
        appointmentSchedulingService.findDoctorAppointments(doctorId);
    return ResponseEntity.ok(appointmentDtos);
  }
}
