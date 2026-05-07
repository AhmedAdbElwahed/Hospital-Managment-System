package org.hms.medica.labtest.controller;

import org.hms.medica.labtest.model.LabTest;
import org.hms.medica.labtest.service.LabTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hms/v1/lab-tests")
public class LabTestController {

    private final LabTestService labTestService;

    @Autowired
    public LabTestController(LabTestService labTestService) {
        this.labTestService = labTestService;
    }

    @PostMapping("/save")
    public ResponseEntity<LabTest> saveLabTest(@RequestBody LabTest labTest) {
        LabTest savedLabTest = labTestService.saveLabTest(labTest);
        return new ResponseEntity<>(savedLabTest, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<LabTest>> getAllLabTests(Pageable pageable) {
        Page<LabTest> labTests = labTestService.getAllLabTests(pageable);
        return new ResponseEntity<>(labTests, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LabTest> getLabTestById(@PathVariable Long id) {
        return labTestService.getLabTestById(id)
                .map(labTest -> new ResponseEntity<>(labTest, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLabTestById(@PathVariable Long id) {
        labTestService.deleteLabTestById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
