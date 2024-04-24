package org.hms.medica.doctor.service;


import lombok.AllArgsConstructor;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.doctor.repo.DoctorRepository;
import org.hms.medica.user.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DoctorService {

    private DoctorRepository doctorRepository;

    public User getDoctor(String name) {
        return doctorRepository.getDoctorByFirstname(name).orElseThrow(() ->
                new RuntimeException("Could not find" + name));
    }

    public List<? extends User> getAllDoctors() {
        return doctorRepository.findAll();
    }
}
