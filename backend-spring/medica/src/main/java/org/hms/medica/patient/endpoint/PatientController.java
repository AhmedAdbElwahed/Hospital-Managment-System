package org.hms.medica.patient.endpoint;

import lombok.RequiredArgsConstructor;
import org.hms.medica.patient.service.PatientService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/patients")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ROLE_PATIENT')")
public class PatientController {
  private final PatientService patientService;

  @GetMapping("/appointments")
  public ResponseEntity<?> getPatient() {
    return ResponseEntity.ok(patientService.getAppointments());
  }
}
