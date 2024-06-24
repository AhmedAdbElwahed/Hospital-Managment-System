package org.hms.medica.examination.controller;

import lombok.RequiredArgsConstructor;
import org.hms.medica.examination.dto.ExaminationDto;
import org.hms.medica.examination.model.Examination;
import org.hms.medica.examination.service.ExaminationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/examinations")
@RequiredArgsConstructor
public class ExaminationController {

  private final ExaminationService examinationService;

  @PostMapping()
  public ResponseEntity<String> createExamination(@RequestBody ExaminationDto examinationDto) {
    Long examinationId = examinationService.createExamination(examinationDto);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body("Examination saved with id: " + examinationId);
  }

  @GetMapping
  public ResponseEntity<List<Examination>> getAllExaminations() {
    List<Examination> examinations = examinationService.retrieveAllExaminations();
    return ResponseEntity.ok(examinations);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Examination> getExaminationById(@PathVariable Long id) {
    Optional<Examination> examinationOptional = examinationService.findExaminationById(id);
    return examinationOptional
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteExamination(@PathVariable Long id) {
    if (!examinationService.findExaminationById(id).isPresent()) {
      return ResponseEntity.notFound().build();
    }
    examinationService.removeExaminationById(id);
    return ResponseEntity.noContent().build();
  }
}
