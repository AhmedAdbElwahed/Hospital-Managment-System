package org.hms.medica.doctor.endpoint;

import lombok.RequiredArgsConstructor;
import org.hms.medica.doctor.dto.AdditionalInfoDto;
import org.hms.medica.doctor.dto.RegisterDoctor;
import org.hms.medica.doctor.service.DoctorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/doctor")
@RequiredArgsConstructor
public class DoctorController {
    private final DoctorService doctorService;

    @GetMapping("/appointments")
    public ResponseEntity<?> getPatient() {
        return ResponseEntity.ok(doctorService.getAppointments());
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerDoctor(@RequestBody RegisterDoctor registerDoctor) {
        doctorService.registerDoctor(registerDoctor);
        return ResponseEntity.status(HttpStatus.CREATED).body("Doctor add successfully");
    }

    @PostMapping("/additional-info")
    public ResponseEntity<String> addAdditionalInfo(@RequestBody AdditionalInfoDto additionalInfoDto) {
        doctorService.addAdditionalInfo(additionalInfoDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Additional Info added successfully");
    }
}
