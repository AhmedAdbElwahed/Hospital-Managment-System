package org.hms.medica.doctor.endpoint;

import lombok.RequiredArgsConstructor;
import org.hms.medica.doctor.dto.DoctorDto;
import org.hms.medica.doctor.dto.DoctorResponseDto;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.doctor.repo.DoctorRepository;
import org.hms.medica.doctor.service.DoctorService;
import com.querydsl.core.types.Predicate;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
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
    public ResponseEntity<?> getDoctorAppointments() {
        return ResponseEntity.ok(doctorService.getAppointments());
    }

    @GetMapping()
    public ResponseEntity<List<DoctorResponseDto>> getAllDoctors(
            @QuerydslPredicate(root = Doctor.class, bindings = DoctorRepository.class)
            Predicate predicate,
            Pageable pageable
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(doctorService.getAllDoctors(predicate, pageable));
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerDoctor(
            @RequestBody DoctorDto doctorDto) {
        System.out.println(doctorDto.toString());
        doctorService.registerDoctor(doctorDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Doctor add successfully");
    }

    @GetMapping("/search")
    public ResponseEntity<List<DoctorResponseDto>> searchDoctor(
            @RequestParam String keyword
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(doctorService.searchDoctors(keyword));
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<DoctorResponseDto> getDoctorById(@PathVariable(name = "id") Long doctorId) {
        return ResponseEntity.status(HttpStatus.OK).body(doctorService.getDoctorDtoById(doctorId));
    }

    @PutMapping("/update-by-id/{id}")
    public ResponseEntity<DoctorResponseDto> updateDoctorById(@PathVariable(name = "id") Long doctorId,
                                                   @RequestBody DoctorDto doctorDto) {
        var doctor = doctorService.updateDoctor(doctorId, doctorDto);
        return ResponseEntity.status(HttpStatus.OK).body(doctor);
    }

    @DeleteMapping("/delete-by-id/{id}")
    public ResponseEntity<String> deleteDoctorById(@PathVariable(name = "id") Long id) {
        doctorService.deleteDoctorById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Doctor deleted successfully");
    }

}
