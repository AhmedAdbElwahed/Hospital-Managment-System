package org.hms.medica.examination.controller;

import org.hms.medica.examination.model.Examination;
import org.hms.medica.examination.service.ExaminationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/hms/v1/examinations")
public class ExaminationController {

    private final ExaminationService examinationService;

    @Autowired
    public ExaminationController(ExaminationService examinationService) {
        this.examinationService = examinationService;
    }

    @PostMapping("/create")
    public ResponseEntity<Examination> createExamination(@RequestBody Examination examination) {
        Examination savedExamination = examinationService.saveExamination(examination);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedExamination);
    }

    @GetMapping
    public ResponseEntity<List<Examination>> getAllExaminations() {
        List<Examination> examinations = examinationService.getAllExaminations();
        return ResponseEntity.ok(examinations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Examination> getExaminationById(@PathVariable Long id) {
        Optional<Examination> examinationOptional = examinationService.getExaminationById(id);
        return examinationOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Examination> updateExamination(@PathVariable Long id, @RequestBody Examination examination) {
        if (!examinationService.getExaminationById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        examination.setId(id);
        Examination updatedExamination = examinationService.saveExamination(examination);
        return ResponseEntity.ok(updatedExamination);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExamination(@PathVariable Long id) {
        if (!examinationService.getExaminationById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        examinationService.deleteExaminationById(id);
        return ResponseEntity.noContent().build();
    }
}
