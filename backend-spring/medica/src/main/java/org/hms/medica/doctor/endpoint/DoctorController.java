package org.hms.medica.doctor.endpoint;

import lombok.RequiredArgsConstructor;
import org.hms.medica.doctor.dto.DoctorDto;
import org.hms.medica.doctor.dto.DoctorResponseDto;
import org.hms.medica.doctor.service.DoctorService;
import org.hms.medica.user.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/doctor")
@RequiredArgsConstructor
public class DoctorController {
    private final DoctorService doctorService;

    @GetMapping("/appointments")
    public ResponseEntity<?> getPatient() {
        return ResponseEntity.ok(doctorService.getAppointments());
    }

    @GetMapping()
    public ResponseEntity<List<DoctorResponseDto>> getAllDoctors() {
        return ResponseEntity.status(HttpStatus.OK).body(doctorService.getAllDoctors());
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerDoctor(
            @RequestBody DoctorDto doctorDto) {
        System.out.println(doctorDto.toString());
        doctorService.registerDoctor(doctorDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Doctor add successfully");
    }
}
