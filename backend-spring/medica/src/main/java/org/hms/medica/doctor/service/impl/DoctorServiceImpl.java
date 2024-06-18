package org.hms.medica.doctor.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


import lombok.AllArgsConstructor;
import com.querydsl.core.types.Predicate;
import org.hms.medica.appointment.dto.DoctorAppointmentDto;
import org.hms.medica.appointment.mapper.DoctorAppointmentMapper;
import org.hms.medica.appointment.service.UserAppointmentService;
import org.hms.medica.auth.repo.RoleRepository;
import org.hms.medica.doctor.dto.DoctorDto;
import org.hms.medica.doctor.dto.DoctorResponseDto;
import org.hms.medica.doctor.mapper.DoctorMapper;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.doctor.repo.DoctorRepository;
import org.hms.medica.doctor.service.DoctorService;
import org.hms.medica.user.model.User;
import org.hms.medica.user.repo.UserRepository;
import org.hms.medica.user.service.UserService;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


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
        user.setPassword(passwordEncoder.encode(doctorDto.getRequiredInfoDto().getPassword()));
        user.setRoles(Set.of(role));
        createDoctorObj(doctorDto, user);
        userRepository.save(user);
    }

    @Override
    public List<DoctorResponseDto> searchDoctors(String keyword) {
        return doctorRepository
                .findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCaseOrSpecialtyContainingIgnoreCase(
                        keyword,
                        keyword,
                        keyword)
                .stream()
                .map(doctorMapper::mapDoctorToDoctorResponseDto)
                .toList();
    }

    @Override
    public void deleteDoctorById(Long id) {
        var doctor = doctorRepository.findById(id).orElseThrow(() ->
                new UsernameNotFoundException("Doctor Not Found With Id + " + id));
        doctorRepository.delete(doctor);
    }

    @Transactional
    @Override
    public DoctorResponseDto updateDoctor(Long id, DoctorDto doctorDto) {
        var doctor = doctorRepository.findById(id).orElseThrow(() ->
                new UsernameNotFoundException("Doctor Not Found With Id + " + id));
        if (doctorDto.getRequiredInfoDto().getPassword() != null)
            doctor.setPassword(passwordEncoder.encode(doctorDto.getRequiredInfoDto().getPassword()));
        createDoctorObj(doctorDto, doctor);
        doctorRepository.save(doctor);
        return doctorMapper.mapDoctorToDoctorResponseDto(doctor);
    }

    private void createDoctorObj(DoctorDto doctorDto, Doctor doctor) {
        doctor.setFirstname(doctorDto.getRequiredInfoDto().getFirstname());
        doctor.setLastname(doctorDto.getRequiredInfoDto().getLastname());
        doctor.setAddress(doctorDto.getRequiredInfoDto().getAddress());
        doctor.setEmail(doctorDto.getRequiredInfoDto().getEmail());
        doctor.setGender(doctorDto.getRequiredInfoDto().getGender());
        doctor.setDob(doctorDto.getRequiredInfoDto().getDob());
        doctor.setPhone(doctorDto.getRequiredInfoDto().getPhone());
        doctor.setIs_enabled(doctorDto.getRequiredInfoDto().getIs_enabled());
        doctor.setActiveStatus(doctorDto.getAdditionalInfoDto().isActiveStatus());
        doctor.setEducation(doctorDto.getAdditionalInfoDto().getEducation());
        doctor.setSpecialty(doctorDto.getAdditionalInfoDto().getSpecialty());
        doctor.setExperience(doctorDto.getAdditionalInfoDto().getExperience());
        doctor.setCertifications(doctorDto.getAdditionalInfoDto().getCertifications());
        doctor.setWorkStartTime(doctorDto.getAdditionalInfoDto().getWorkStartTime());
        doctor.setWorkEndTime(doctorDto.getAdditionalInfoDto().getWorkEndTime());
        doctor.setLicenseNumber(doctorDto.getAdditionalInfoDto().getLicenseNumber());
    }

    public User getDoctor(String name) {
        return doctorRepository
                .getDoctorByFirstname(name)
                .orElseThrow(() -> new RuntimeException("Could not find" + name));
    }

    public DoctorResponseDto getDoctorDtoById(Long id) {
        var doctor = doctorRepository
                .findById(id)
                .orElseThrow(
                        () -> new UsernameNotFoundException(String.format("User with id %d Not found", id)));
        return doctorMapper.mapDoctorToDoctorResponseDto(doctor);
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

    public List<DoctorResponseDto> getAllDoctors(Predicate predicate, Pageable pageable) {
        return doctorRepository.findAll(predicate, pageable)
                .stream()
                .map(doctorMapper::mapDoctorToDoctorResponseDto)
                .toList();
    }
}
