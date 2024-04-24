package org.hms.medica.doctor;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.doctor.service.DoctorService;
import org.hms.medica.user.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@RequestMapping("hms/v1/doctor")
public class DoctorController {


    private DoctorService doctorService;

    @RequestMapping("{doctorName}")
    public ResponseEntity<User> get(@PathVariable(name = "doctorName") String doctorName) {
        return ResponseEntity.status(HttpStatus.OK).body(doctorService.getDoctor(doctorName));
    }

    @RequestMapping()
    public ResponseEntity<List<? extends User>> get() {
        return ResponseEntity.status(HttpStatus.OK).body(doctorService.getAllDoctors());
    }


}
