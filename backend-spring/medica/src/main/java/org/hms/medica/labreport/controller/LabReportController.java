package org.hms.medica.labreport.controller;

import org.hms.medica.labreport.model.LabReport;
import org.hms.medica.labreport.service.LabReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/hms/v1/lab-reports")
public class LabReportController {

    private final LabReportService labReportService;

    @Autowired
    public LabReportController(LabReportService labReportService) {
        this.labReportService = labReportService;
    }

    @PostMapping("/add")
    public ResponseEntity<LabReport> createLabReport(@RequestBody LabReport labReport) {
        LabReport createdLabReport = labReportService.createLabReport(labReport);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdLabReport);
    }

    @GetMapping
    public ResponseEntity<List<LabReport>> getAllLabReports() {
        List<LabReport> labReports = labReportService.getAllLabReports();
        return ResponseEntity.ok(labReports);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LabReport> getLabReportById(@PathVariable Long id) {
        Optional<LabReport> labReportOptional = labReportService.getLabReportById(id);
        return labReportOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LabReport> updateLabReport(@PathVariable Long id, @RequestBody LabReport labReport) {
        LabReport updatedLabReport = labReportService.updateLabReport(id, labReport);
        return ResponseEntity.ok(updatedLabReport);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLabReport(@PathVariable Long id) {
        labReportService.deleteLabReport(id);
        return ResponseEntity.noContent().build();
    }
}
