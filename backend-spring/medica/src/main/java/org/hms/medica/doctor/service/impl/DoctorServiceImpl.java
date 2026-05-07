package org.hms.medica.doctor.service.impl;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


import com.querydsl.core.types.Predicate;
import lombok.extern.slf4j.Slf4j;
import org.hms.medica.appointment.dto.DoctorAppointmentDto;
import org.hms.medica.appointment.mapper.DoctorAppointmentMapper;
import org.hms.medica.appointment.repository.AppointmentRepository;
import org.hms.medica.appointment.service.UserAppointmentService;
import org.hms.medica.auth.repo.RoleRepository;
import org.hms.medica.doctor.dto.DoctorDto;
import org.hms.medica.doctor.dto.DoctorResponseDto;
import org.hms.medica.doctor.mapper.DoctorMapper;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.doctor.repo.DoctorRepository;
import org.hms.medica.doctor.repo.QDoctorRepository;
import org.hms.medica.doctor.service.DoctorService;
import org.hms.medica.search.service.SearchService;
import org.hms.medica.user.model.User;
import org.hms.medica.user.repo.UserRepository;
import org.hms.medica.user.service.UserService;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;
    private final QDoctorRepository qDoctorRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final UserAppointmentService userAppointmentService;
    private final UserService userService;
    private final DoctorAppointmentMapper doctorAppointmentMapper;
    private final PasswordEncoder passwordEncoder;
    private final DoctorMapper doctorMapper;
    private final AppointmentRepository appointmentRepository;
    private final SearchService searchService;

    public DoctorServiceImpl(DoctorRepository doctorRepository,
                             QDoctorRepository qDoctorRepository,
                             RoleRepository roleRepository,
                             UserRepository userRepository,
                             UserAppointmentService userAppointmentService,
                             UserService userService,
                             DoctorAppointmentMapper doctorAppointmentMapper,
                             PasswordEncoder passwordEncoder,
                             DoctorMapper doctorMapper,
                             AppointmentRepository appointmentRepository,
                             @Lazy SearchService searchService) {
        this.doctorRepository = doctorRepository;
        this.qDoctorRepository = qDoctorRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.userAppointmentService = userAppointmentService;
        this.userService = userService;
        this.doctorAppointmentMapper = doctorAppointmentMapper;
        this.passwordEncoder = passwordEncoder;
        this.doctorMapper = doctorMapper;
        this.appointmentRepository = appointmentRepository;
        this.searchService = searchService;
    }

    public void registerDoctor(DoctorDto doctorDto) {
        var role = roleRepository.getRoleByName("ROLE_DOCTOR").orElseThrow(
                () ->
                        new RuntimeException(
                                String.format("Role %s not found", "ROLE_DOCTOR")));

        Doctor user = new Doctor();
        user.setPassword(passwordEncoder.encode(doctorDto.getRequiredInfoDto().getPassword()));
        user.setRoles(Set.of(role));
        createDoctorObj(doctorDto, user);
        user = userRepository.save(user);
        if (searchService != null) {
            try {
                searchService.syncDoctor(user);
            } catch (Exception e) {
                log.warn("Elasticsearch sync failed for doctor {}: {}", user.getId(), e.getMessage());
            }
        }
    }

    @Override
    public List<DoctorResponseDto> searchDoctors(String keyword) {
        if (searchService != null) {
            try {
                return searchService.searchDoctors(keyword).stream()
                        .map(doctorIndex -> {
                            DoctorResponseDto dto = new DoctorResponseDto();
                            dto.setId(Long.valueOf(doctorIndex.getId()));

                            org.hms.medica.doctor.dto.RequiredInfoDto required = new org.hms.medica.doctor.dto.RequiredInfoDto();
                            required.setFirstname(doctorIndex.getFirstname());
                            required.setLastname(doctorIndex.getLastname());
                            required.setEmail(doctorIndex.getEmail());
                            required.setPhone(doctorIndex.getPhone());
                            dto.setRequiredInfoDto(required);

                            org.hms.medica.doctor.dto.AdditionalInfoDto additional = new org.hms.medica.doctor.dto.AdditionalInfoDto();
                            additional.setSpecialty(doctorIndex.getSpecialty());
                            additional.setLicenseNumber(doctorIndex.getLicenseNumber());
                            additional.setEducation(doctorIndex.getEducation());
                            dto.setAdditionalInfoDto(additional);

                            return dto;
                        })
                        .toList();
            } catch (Exception e) {
                log.warn("Elasticsearch search failed, falling back to database: {}", e.getMessage());
            }
        }
        
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
        if (searchService != null) {
            try {
                searchService.deleteDoctorIndex(id);
            } catch (Exception e) {
                log.warn("Elasticsearch delete failed for doctor {}: {}", id, e.getMessage());
            }
        }
    }

    @Transactional
    @Override
    public DoctorResponseDto updateDoctor(Long id, DoctorDto doctorDto) {
        var doctor = doctorRepository.findById(id).orElseThrow(() ->
                new UsernameNotFoundException("Doctor Not Found With Id + " + id));
        var doctorPassword = doctorDto.getRequiredInfoDto().getPassword();
        if (!(doctorPassword.isEmpty() || doctorPassword.isBlank()))
            doctor.setPassword(passwordEncoder.encode(doctorDto.getRequiredInfoDto().getPassword()));
        createDoctorObj(doctorDto, doctor);
        doctor = doctorRepository.save(doctor);
        if (searchService != null) {
            try {
                searchService.syncDoctor(doctor);
            } catch (Exception e) {
                log.warn("Elasticsearch sync failed for doctor {}: {}", doctor.getId(), e.getMessage());
            }
        }
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

    @Override
    public List<DoctorResponseDto> findDoctorByFullName(String fullName) {
        return qDoctorRepository.findDoctorByFullName(fullName)
                .stream()
                .map(doctorMapper::mapDoctorToDoctorResponseDto)
                .toList();
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

    @Override
    public List<LocalTime> getAllAvailableTimes(Long doctorId) {
        List<LocalTime> availableTimes = new ArrayList<>();
        var doctor = getDoctorById(doctorId);
        var startTime = doctor.getWorkStartTime();
        var endTime = doctor.getWorkEndTime();
        while (!startTime.equals(endTime)) {

            boolean isPresent = userAppointmentService.IsAppointmentByStartTimePresent(startTime, doctor);
            log.info("is Appointment present: {}", isPresent);
            if (!isPresent) {
                if(startTime.isAfter(LocalTime.now()))
                    availableTimes.add(startTime);
            }
            startTime = startTime.plusMinutes(30L);
        }
        return availableTimes;
    }
}
