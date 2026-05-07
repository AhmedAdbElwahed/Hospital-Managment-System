package org.hms.medica.doctor.service;

import com.querydsl.core.types.Predicate;
import org.hms.medica.appointment.dto.DoctorAppointmentDto;
import org.hms.medica.doctor.dto.DoctorDto;
import org.hms.medica.doctor.dto.DoctorResponseDto;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.user.model.User;
import org.springframework.data.domain.Page;
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

  Page<DoctorResponseDto> findDoctorByFullName(String fullName, Pageable pageable);


  Doctor getDoctorByEmail(String email);

  List<DoctorAppointmentDto> getAppointments();

  Page<DoctorResponseDto> getAllDoctors(Predicate predicate, Pageable pageable);

  @Transactional
  void registerDoctor(DoctorDto doctorDto);

  Page<DoctorResponseDto> searchDoctors(String keyword, Pageable pageable);

  @Transactional
  void deleteDoctorById (Long id);

  @Transactional
  DoctorResponseDto updateDoctor(Long id, DoctorDto doctorDto);

  List<LocalTime> getAllAvailableTimes(Long doctorId);

}
