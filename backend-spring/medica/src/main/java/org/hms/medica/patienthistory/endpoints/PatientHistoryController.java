package org.hms.medica.patienthistory.endpoints;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hms.medica.patienthistory.dto.PatientHistoryDto;
import org.hms.medica.patienthistory.service.PatientHistoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api/vi/patient-history")
public class PatientHistoryController {

    private final PatientHistoryService patientHistoryService;

    @GetMapping
    public ResponseEntity<List<PatientHistoryDto>> fetchAllPatientHistory() {
        return ResponseEntity.status(HttpStatusCode.valueOf(200))
                .body(patientHistoryService.getAllPatientHistories());
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<PatientHistoryDto> fetchPatientHistoryById(@PathVariable(name = "id") Long historyId) {
        return ResponseEntity.status(HttpStatusCode.valueOf(200))
                .body(patientHistoryService.getPatientHistoryById(historyId));
    }

    @GetMapping("/get_by-patient-id/{id}")
    public ResponseEntity<PatientHistoryDto> fetchPatientHistoryByPatientId(
            @PathVariable(name = "id") Long patientId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(patientHistoryService.getPatientHistoryByPatient(patientId));
    }

    @PostMapping("/add-patient-hist")
    public ResponseEntity<String> addPatientHistory(
            @RequestBody PatientHistoryDto patientHistoryDto) {
        log.info("Add Patient History Dto {}", patientHistoryDto);
        patientHistoryService.savePatientHistory(patientHistoryDto);
        return ResponseEntity.status(HttpStatus.OK).body("History added successfully");
    }

    @PutMapping("/update-patient-hist")
    public ResponseEntity<String> updatePatientHistory(
            @RequestBody PatientHistoryDto patientHistoryDto) {
        log.info("Update Patient History Dto: {} with patient Id: {}", patientHistoryDto, patientHistoryDto.getPatientId());
        patientHistoryService.updatePatientHistory(patientHistoryDto);
        return ResponseEntity.status(HttpStatusCode.valueOf(200)).body("Patient History Updated successfully");
    }



}
