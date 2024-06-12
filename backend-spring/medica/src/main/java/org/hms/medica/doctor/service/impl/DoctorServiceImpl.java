package org.hms.medica.doctor.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.hms.medica.appointment.dto.DoctorAppointmentDto;
import org.hms.medica.appointment.mapper.DoctorAppointmentMapper;
import org.hms.medica.appointment.service.UserAppointmentService;
import org.hms.medica.auth.reop.RoleRepository;
import org.hms.medica.doctor.dto.AdditionalInfoDto;
import org.hms.medica.doctor.dto.RegisterDoctor;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.doctor.repo.DoctorRepository;
import org.hms.medica.doctor.service.DoctorService;
import org.hms.medica.user.model.User;
import org.hms.medica.user.repo.UserRepository;
import org.hms.medica.user.service.UserService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DoctorServiceImpl implements DoctorService {

  private DoctorRepository doctorRepository;
  private RoleRepository roleRepository;
  private UserRepository userRepository;
  private UserAppointmentService userAppointmentService;
  private UserService userService;
  private DoctorAppointmentMapper doctorAppointmentMapper;
  private PasswordEncoder passwordEncoder;

  public void registerDoctor(RegisterDoctor registerDoctorDto) {
      var role = roleRepository.getRoleByName("ROLE_DOCTOR").orElseThrow(
              () ->
                      new RuntimeException(
                              String.format("Role %s not found", "ROLE_DOCTOR")));

      Doctor user = new Doctor();
      user.setFirstname(registerDoctorDto.getFirstname());
      user.setLastname(registerDoctorDto.getLastname());
      user.setPassword(passwordEncoder.encode(registerDoctorDto.getPassword()));
      user.setAddress(registerDoctorDto.getAddress());
      user.setEmail(registerDoctorDto.getEmail());
      user.setDob(registerDoctorDto.getDob());
      user.setPhone(registerDoctorDto.getPhone());
      user.setIs_enabled(registerDoctorDto.getIs_enabled());
      user.setCreate_at(LocalDateTime.now());
      user.setRoles(Set.of(role));
      userRepository.save(user);
  }

  public void addAdditionalInfo(AdditionalInfoDto additionalInfoDto) {
    var doctor = doctorRepository.findById(additionalInfoDto.getDoctorId()).orElseThrow(
            () -> new RuntimeException("No Doctor was found with id " + additionalInfoDto.getDoctorId())
    );
    doctor.setActiveStatus(additionalInfoDto.isActiveStatus());
    doctor.setEducation(additionalInfoDto.getEducation());
    doctor.setSpecialty(additionalInfoDto.getSpecialty());
    doctor.setExperience(additionalInfoDto.getExperience());
    doctor.setCertifications(additionalInfoDto.getCertifications());
    doctor.setWorkStartTime(additionalInfoDto.getWorkStartTime());
    doctor.setWorkEndTime(additionalInfoDto.getWorkEndTime());
    doctor.setLicenseNumber(additionalInfoDto.getLicenseNumber());
    doctorRepository.save(doctor);
  }

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
