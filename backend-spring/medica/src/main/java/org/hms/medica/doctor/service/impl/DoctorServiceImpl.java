package org.hms.medica.doctor.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.hms.medica.appointment.dto.DoctorAppointmentDto;
import org.hms.medica.appointment.mapper.DoctorAppointmentMapper;
import org.hms.medica.appointment.service.UserAppointmentService;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.doctor.repo.DoctorRepository;
import org.hms.medica.doctor.service.DoctorService;
import org.hms.medica.user.model.User;
import org.hms.medica.user.service.UserService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DoctorServiceImpl implements DoctorService {

  private DoctorRepository doctorRepository;
  private UserAppointmentService userAppointmentService;
  private UserService userService;
  private DoctorAppointmentMapper doctorAppointmentMapper;

  public User getDoctor(String name) {
    return doctorRepository
        .getDoctorByFirstname(name)
        .orElseThrow(() -> new RuntimeException("Could not find" + name));
  }

  public Doctor getDoctorById(Long id) {
    return doctorRepository
        .findById(id)
        .orElseThrow(
            () -> new UsernameNotFoundException(String.format("User with id %d Not found", id)));
  }

  public Doctor getDoctorByEmail(String email) {
    return doctorRepository
        .getDoctorByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("No user found with email " + email));
  }

  public List<DoctorAppointmentDto> getAppointments() {
    User user = userService.getCurrentUser();
    return userAppointmentService.findUserAppointments(user).stream()
        .map(
            (appointment) -> {
              DoctorAppointmentDto doctorAppointmentDto =
                  doctorAppointmentMapper.toDto(appointment);
              doctorAppointmentDto.setPatientId(appointment.getPatient().getId());
              return doctorAppointmentDto;
            })
        .collect(Collectors.toList());
  }

  public List<? extends User> getAllDoctors() {
    return doctorRepository.findAll();
  }
}
