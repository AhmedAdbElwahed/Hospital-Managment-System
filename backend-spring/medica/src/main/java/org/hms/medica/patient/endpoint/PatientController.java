package org.hms.medica.patient.endpoint;

import com.querydsl.core.types.Predicate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.doctor.repo.DoctorRepository;
import org.hms.medica.patient.dto.PatientDto;
import org.hms.medica.patient.dto.PatientResponseDto;
import org.hms.medica.patient.model.Patient;
import org.hms.medica.patient.repo.PatientRepository;
import org.hms.medica.patient.service.PatientService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
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

    @GetMapping
    public ResponseEntity<List<PatientResponseDto>> fetchAllPatients(
            @QuerydslPredicate(root = Patient.class, bindings = PatientRepository.class)
            Predicate predicate,
            Pageable pageable
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(patientService.getAllPatients(predicate, pageable));
    }

    @GetMapping("/search-full-name")
    public ResponseEntity<List<PatientResponseDto>> searchPatientByFullName(
            @RequestParam String fullName
    )  {
        log.info("full name: {}", fullName);
        return ResponseEntity.status(HttpStatus.OK).body(patientService.findPatientByFullName(fullName));
    }


    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<PatientResponseDto> fetchPatientById(@PathVariable(name = "id") Long patientId) {
        return ResponseEntity.status(HttpStatus.OK).body(patientService.getPatientDtoById(patientId));
    }

    @PostMapping("/add-patient")
    public ResponseEntity<String> registerPatient(@RequestBody PatientDto patientDto) {
        patientService.registerPatient(patientDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Patient add successfully");
    }

    @PutMapping("/update-patient/{id}")
    public ResponseEntity<PatientResponseDto> updatePatient(
            @PathVariable(name = "id") Long patientId,
            @RequestBody PatientDto patientDto) {
        System.out.println(patientDto);
        var patient = patientService.updatePatient(patientId, patientDto);
        return ResponseEntity.status(HttpStatus.OK).body(patient);
    }

    @DeleteMapping("/delete-by-id/{id}")
    public ResponseEntity<String> deletePatientById(@PathVariable(name = "id") Long patientId) {
        patientService.deleteById(patientId);
        return ResponseEntity.status(HttpStatus.OK).body("Patient deleted successfully");
    }
}
