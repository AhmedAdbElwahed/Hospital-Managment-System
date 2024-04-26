package org.hms.medica.doctor.service;

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
}
