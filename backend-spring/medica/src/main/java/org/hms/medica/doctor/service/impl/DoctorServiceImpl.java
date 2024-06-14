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
import org.hms.medica.doctor.dto.DoctorDto;
import org.hms.medica.doctor.dto.DoctorResponseDto;
import org.hms.medica.doctor.mapper.DoctorMapper;
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
    private DoctorMapper doctorMapper;

    public void registerDoctor(DoctorDto doctorDto) {
        var role = roleRepository.getRoleByName("ROLE_DOCTOR").orElseThrow(
                () ->
                        new RuntimeException(
                                String.format("Role %s not found", "ROLE_DOCTOR")));

        Doctor user = new Doctor();
        user.setFirstname(doctorDto.getRequiredInfoDto().getFirstname());
        user.setLastname(doctorDto.getRequiredInfoDto().getLastname());
        user.setPassword(passwordEncoder.encode(doctorDto.getRequiredInfoDto().getPassword()));
        user.setAddress(doctorDto.getRequiredInfoDto().getAddress());
        user.setEmail(doctorDto.getRequiredInfoDto().getEmail());
        user.setGender(doctorDto.getRequiredInfoDto().getGender());
        user.setDob(doctorDto.getRequiredInfoDto().getDob());
        user.setPhone(doctorDto.getRequiredInfoDto().getPhone());
        user.setIs_enabled(doctorDto.getRequiredInfoDto().getIs_enabled());
        user.setCreate_at(LocalDateTime.now());
        user.setRoles(Set.of(role));
        user.setActiveStatus(doctorDto.getAdditionalInfoDto().isActiveStatus());
        user.setEducation(doctorDto.getAdditionalInfoDto().getEducation());
        user.setSpecialty(doctorDto.getAdditionalInfoDto().getSpecialty());
        user.setExperience(doctorDto.getAdditionalInfoDto().getExperience());
        user.setCertifications(doctorDto.getAdditionalInfoDto().getCertifications());
        user.setWorkStartTime(doctorDto.getAdditionalInfoDto().getWorkStartTime());
        user.setWorkEndTime(doctorDto.getAdditionalInfoDto().getWorkEndTime());
        user.setLicenseNumber(doctorDto.getAdditionalInfoDto().getLicenseNumber());
        userRepository.save(user);
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

    public List<DoctorResponseDto> getAllDoctors() {
        return doctorRepository.findAll()
                .stream()
                .map(doctorMapper::mapDoctorToDoctorResponseDto)
                .toList();
    }
}
