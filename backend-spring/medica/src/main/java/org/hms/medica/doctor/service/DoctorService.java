package org.hms.medica.doctor.service;

import org.hms.medica.appointment.dto.DoctorAppointmentDto;
import org.hms.medica.doctor.dto.AdditionalInfoDto;
import org.hms.medica.doctor.dto.RegisterDoctor;
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

  List<? extends User> getAllDoctors();

  void registerDoctor(RegisterDoctor registerDoctor);

  void addAdditionalInfo(AdditionalInfoDto additionalInfoDto);
}
