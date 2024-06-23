package org.hms.medica.doctor.service;

import com.querydsl.core.types.Predicate;
import org.hms.medica.appointment.dto.DoctorAppointmentDto;
import org.hms.medica.doctor.dto.DoctorDto;
import org.hms.medica.doctor.dto.DoctorResponseDto;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.user.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.List;

@Service
public interface DoctorService {
  User getDoctor(String name);

  DoctorResponseDto getDoctorDtoById(Long id);
  Doctor getDoctorById(Long id);

  List<DoctorResponseDto> findDoctorByFullName(String fullName);


  Doctor getDoctorByEmail(String email);

  List<DoctorAppointmentDto> getAppointments();

  List<DoctorResponseDto> getAllDoctors(Predicate predicate, Pageable pageable);

  @Transactional
  void registerDoctor(DoctorDto doctorDto);

  List<DoctorResponseDto> searchDoctors(String keyword);

  @Transactional
  void deleteDoctorById (Long id);

  @Transactional
  DoctorResponseDto updateDoctor(Long id, DoctorDto doctorDto);

  List<LocalTime> getAllAvailableTimes(Long doctorId);

}
