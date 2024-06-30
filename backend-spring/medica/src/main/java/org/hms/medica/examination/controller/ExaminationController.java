package org.hms.medica.examination.controller;


import lombok.RequiredArgsConstructor;
import org.hms.medica.examination.dto.ExaminationDto;
import org.hms.medica.examination.service.ExaminationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hms/v1/examinations")
@RequiredArgsConstructor
public class ExaminationController {

    private final ExaminationService examinationService;

    @PostMapping()
    public ResponseEntity<String> createExamination(@RequestBody ExaminationDto examinationDto) {
        examinationService.saveExamination(examinationDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Added Successfully");
    }

    @GetMapping
    public ResponseEntity<List<ExaminationDto>> getAllExaminations() {
        return ResponseEntity.status(HttpStatus.OK).body(examinationService.getAllExaminations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExaminationDto> getExaminationById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatusCode.valueOf(200))
                .body(examinationService.getExaminationById(id));
    }

//  @PutMapping("/{id}")
//  public ResponseEntity<Examination> updateExamination(
//      @PathVariable Long id, @RequestBody Examination examination) {
//    if (!examinationService.getExaminationById(id).isPresent()) {
//      return ResponseEntity.notFound().build();
//    }
//    examination.setId(id);
//    Examination updatedExamination = examinationService.saveExamination(examination);
//    return ResponseEntity.ok(updatedExamination);
//  }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExamination(@PathVariable Long id) {
        examinationService.deleteExaminationById(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
