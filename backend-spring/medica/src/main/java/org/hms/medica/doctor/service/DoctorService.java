package org.hms.medica.doctor.service;

import org.hms.medica.appointment.dto.DoctorAppointmentDto;
import org.hms.medica.doctor.dto.DoctorDto;
import org.hms.medica.doctor.dto.DoctorResponseDto;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.user.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DoctorService {
  User getDoctor(String name);

  Doctor getDoctorById(Long id);

  Doctor getDoctorByEmail(String email);

  List<DoctorAppointmentDto> getAppointments();

  List<DoctorResponseDto> getAllDoctors();

  void registerDoctor(DoctorDto doctorDto);

}
