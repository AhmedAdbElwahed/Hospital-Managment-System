package org.hms.medica.admission.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.hms.medica.admission.dto.AdmissionRequestDto;
import org.hms.medica.admission.dto.AdmissionResponseDto;
import org.hms.medica.admission.service.AdmissionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admissions")
@RequiredArgsConstructor
public class AdmissionController {
  private final AdmissionService admissionService;

  @PostMapping
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<?> admitPatient(
      @RequestBody @Valid AdmissionRequestDto admissionRequestDto) {

    Long admissionId = admissionService.admitPatient(admissionRequestDto);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body("Admission created with id: " + admissionId);
  }

  @GetMapping
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<?> getAdmissions(@RequestParam int pageSize) {

    List<AdmissionResponseDto> admissionRequestDtos = admissionService.getAdmissions(pageSize);
    return ResponseEntity.ok(admissionRequestDtos);
  }

  @DeleteMapping("/{admissionId}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<?> deleteAdmissionById(@PathVariable Long admissionId) {
    admissionService.deleteAdmissionById(admissionId);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/{admissionId}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<?> getAdmissionById(@PathVariable Long admissionId) {
    AdmissionResponseDto admissionResponseDto = admissionService.findAdmissionById(admissionId);
    return ResponseEntity.ok(admissionResponseDto);
  }

  @PutMapping("/{admissionId}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<?> updateAdmissionById(
      @PathVariable Long admissionId, @RequestBody AdmissionRequestDto admissionRequestDto) {

    admissionService.updateAdmissionById(admissionId, admissionRequestDto);
    return ResponseEntity.ok().build();
  }
}
