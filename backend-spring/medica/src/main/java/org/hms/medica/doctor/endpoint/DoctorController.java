package org.hms.medica.doctor.endpoint;

import lombok.RequiredArgsConstructor;
import org.hms.medica.doctor.service.DoctorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/doctor")
@RequiredArgsConstructor
public class DoctorController {
  private final DoctorService doctorService;

  @GetMapping("/appointments")
  public ResponseEntity<?> getPatient() {
    return ResponseEntity.ok(doctorService.getAppointments());
  }
}
