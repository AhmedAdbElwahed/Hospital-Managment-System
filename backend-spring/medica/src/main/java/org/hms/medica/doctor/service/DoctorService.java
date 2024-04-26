package org.hms.medica.doctor.service;

<<<<<<< HEAD
import lombok.RequiredArgsConstructor;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.doctor.repo.DoctorRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DoctorService {
  private final DoctorRepository doctorRepository;

  public Doctor getDoctorById(Long doctorId) {
    return doctorRepository.findById(doctorId).orElseThrow();
  }
=======

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
>>>>>>> 1e9b987a90de025dbc56f7ea5b4b488d3e2e9ca1
}
