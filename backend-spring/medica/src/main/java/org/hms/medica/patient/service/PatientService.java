package org.hms.medica.patient.service;

import com.querydsl.core.types.Predicate;
import lombok.extern.slf4j.Slf4j;
import org.hms.medica.appointment.dto.PatientAppointmentDto;
import org.hms.medica.appointment.mapper.PatientAppointmentMapper;
import org.hms.medica.appointment.service.UserAppointmentService;
import org.hms.medica.patient.dto.PatientAppointmentResponseDto;
import org.hms.medica.patient.dto.PatientDto;
import org.hms.medica.patient.dto.PatientResponseDto;
import org.hms.medica.patient.mapper.PatientAppointmentResponseMapper;
import org.hms.medica.patient.mapper.PatientMapper;
import org.hms.medica.patient.model.Patient;
import org.hms.medica.patient.repo.PatientRepository;
import org.hms.medica.patient.repo.QPatientRepository;
import org.hms.medica.search.service.SearchService;
import org.hms.medica.user.exception.UserNotFoundException;
import org.hms.medica.user.model.User;
import org.hms.medica.user.service.UserService;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PatientService {

  private final UserAppointmentService userAppointmentService;
  private final UserService userService;
  private final PatientAppointmentMapper patientAppointmentMapper;
  private final PatientRepository patientRepository;
  private final PatientMapper patientMapper;
  private final PatientAppointmentResponseMapper patientAppointmentResponseMapper;
  private final PasswordEncoder passwordEncoder;
  private final QPatientRepository qPatientRepository;
  private final SearchService searchService;

  public PatientService(UserAppointmentService userAppointmentService,
                        UserService userService,
                        PatientAppointmentMapper patientAppointmentMapper,
                        PatientRepository patientRepository,
                        PatientMapper patientMapper,
                        PatientAppointmentResponseMapper patientAppointmentResponseMapper,
                        PasswordEncoder passwordEncoder,
                        QPatientRepository qPatientRepository,
                        @Lazy SearchService searchService) {
    this.userAppointmentService = userAppointmentService;
    this.userService = userService;
    this.patientAppointmentMapper = patientAppointmentMapper;
    this.patientRepository = patientRepository;
    this.patientMapper = patientMapper;
    this.patientAppointmentResponseMapper = patientAppointmentResponseMapper;
    this.passwordEncoder = passwordEncoder;
    this.qPatientRepository = qPatientRepository;
    this.searchService = searchService;
  }

  public List<PatientAppointmentResponseDto> getAppointments() {
    User user = userService.getCurrentUser();
    log.info(String.valueOf(user.getId()));
    return userAppointmentService.findUserAppointments(user).stream()
        .map(patientAppointmentResponseMapper::mapToDto)
        .collect(Collectors.toList());
  }

  public Page<Patient> findAllPatients(Pageable pageable) {
    return patientRepository.findAll(pageable);
  }

  public Page<Patient> findAllTodayPatients(LocalDateTime localDateTime, Pageable pageable) {
    return qPatientRepository.findTodayPatients(localDateTime, pageable);
  }

  public Page<PatientResponseDto> findPatientByFullName(String fullName, Pageable pageable) {
    return qPatientRepository.findPatientByFullName(fullName, pageable)
        .map(patientMapper::mapPatientToPatientResponseDto);
  }

  public Page<PatientResponseDto> getAllPatients(Predicate predicate, Pageable pageable) {
    return patientRepository.findAll(predicate, pageable)
        .map(patientMapper::mapPatientToPatientResponseDto);
  }

  public Patient getPatientById(Long patientId) {
    return patientRepository
        .findById(patientId)
        .orElseThrow(
            () -> new UsernameNotFoundException("Patient not found with id: " + patientId));
  }

  public PatientResponseDto getPatientDtoById(Long patientId) {
    Patient patient = getPatientById(patientId);
    return patientMapper.mapPatientToPatientResponseDto(patient);
  }

  @Transactional
  public void registerPatient(PatientDto patientDto) {
    var patient = new Patient();
    patient = patientMapper.mapPatientDtoToPatient(patientDto);
    patient = patientRepository.save(patient);
    if (searchService != null) {
        try {
            searchService.syncPatient(patient);
        } catch (Exception e) {
            log.warn("Elasticsearch sync failed for patient {}: {}", patient.getId(), e.getMessage());
        }
    }
  }

  @Transactional
  public PatientResponseDto updatePatient(Long patientId, PatientDto patientDto) {
    var patient =
        patientRepository
            .findById(patientId)
            .orElseThrow(
                () -> new UsernameNotFoundException("Patient not found with id: " + patientId));
    var patientPassword = patientDto.getRequiredInfoDto().getPassword();
    if (!(patientPassword.isEmpty() || patientPassword.isBlank()))
      patient.setPassword(passwordEncoder.encode(patientDto.getRequiredInfoDto().getPassword()));
    createPatientObj(patientDto, patient);
    patient = patientRepository.save(patient);
    if (searchService != null) {
        try {
            searchService.syncPatient(patient);
        } catch (Exception e) {
            log.warn("Elasticsearch sync failed for patient {}: {}", patient.getId(), e.getMessage());
        }
    }
    return patientMapper.mapPatientToPatientResponseDto(patient);
  }

  public Patient findById(Long patientId) {
    return patientRepository
        .findById(patientId)
        .orElseThrow(() -> new UserNotFoundException("Patient Not found with id: " + patientId));
  }

  public Page<Patient> findNewPatients(Pageable pageable) {
    return qPatientRepository.findNewPatients(pageable);
  }

  public Page<PatientResponseDto> findMostRecentPatients(Pageable pageable) {
    return qPatientRepository.findRecentPatients(pageable)
        .map(patientMapper::mapPatientToPatientResponseDto);
  }

  public Page<Patient> findOldPatients(Pageable pageable) {
    return qPatientRepository.findOldPatient(pageable);
  }

  @Transactional
  public void deleteById(Long patientId) {
    patientRepository.deleteById(patientId);
    if (searchService != null) {
        try {
            searchService.deletePatientIndex(patientId);
        } catch (Exception e) {
            log.warn("Elasticsearch delete failed for patient {}: {}", patientId, e.getMessage());
        }
    }
  }

  private void createPatientObj(PatientDto patientDto, Patient patient) {
    patient.setFirstname(patientDto.getRequiredInfoDto().getFirstname());
    patient.setLastname(patientDto.getRequiredInfoDto().getLastname());
    patient.setAddress(patientDto.getRequiredInfoDto().getAddress());
    patient.setEmail(patientDto.getRequiredInfoDto().getEmail());
    patient.setGender(patientDto.getRequiredInfoDto().getGender());
    patient.setDob(patientDto.getRequiredInfoDto().getDob());
    patient.setPhone(patientDto.getRequiredInfoDto().getPhone());
    patient.setIs_enabled(patientDto.getRequiredInfoDto().getIs_enabled());
    patient.setNationality(patientDto.getAdditionalInfoDto().getNationality());
    patient.setMaritalStatus(patientDto.getAdditionalInfoDto().getMaritalStatus());
    patient.setBloodType(patientDto.getAdditionalInfoDto().getBloodType());
    patient.setInsurancePolicyNumber(patientDto.getAdditionalInfoDto().getInsurancePolicyNumber());
  }
}
