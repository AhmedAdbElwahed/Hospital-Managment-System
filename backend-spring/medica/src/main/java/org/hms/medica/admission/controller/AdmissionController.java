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
  public ResponseEntity<String> admitPatient(
      @RequestBody @Valid AdmissionRequestDto admissionRequestDto) {

    Long admissionId = admissionService.admitPatient(admissionRequestDto);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body("Admission created with id: " + admissionId);
  }

  @GetMapping
  public ResponseEntity<List<AdmissionResponseDto>> getAdmissions(@RequestParam Integer pageSize) {

    List<AdmissionResponseDto> admissionRequestDtos = admissionService.getAdmissions(pageSize);
    return ResponseEntity.ok(admissionRequestDtos);
  }

  @DeleteMapping("/{admissionId}")
  public ResponseEntity<Void> deleteAdmissionById(@PathVariable Long admissionId) {
    admissionService.deleteAdmissionById(admissionId);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/{admissionId}")
  public ResponseEntity<AdmissionResponseDto> getAdmissionById(@PathVariable Long admissionId) {
    AdmissionResponseDto admissionResponseDto = admissionService.findAdmissionById(admissionId);
    return ResponseEntity.ok(admissionResponseDto);
  }

  @PutMapping("/{admissionId}")
  public ResponseEntity<Void> updateAdmissionById(
      @PathVariable Long admissionId, @RequestBody AdmissionRequestDto admissionRequestDto) {

    admissionService.updateAdmissionById(admissionId, admissionRequestDto);
    return ResponseEntity.ok().build();
  }

}
