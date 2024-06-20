package org.hms.medica.patient.service;



import com.querydsl.core.types.Predicate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hms.medica.appointment.dto.PatientAppointmentDto;
import org.hms.medica.appointment.mapper.PatientAppointmentMapper;
import org.hms.medica.appointment.service.UserAppointmentService;
import org.hms.medica.patient.dto.PatientDto;
import org.hms.medica.patient.dto.PatientResponseDto;
import org.hms.medica.patient.mapper.PatientMapper;
import org.hms.medica.patient.model.Patient;
import org.hms.medica.patient.repo.PatientRepository;
import org.hms.medica.user.exception.UserNotFoundException;
import org.hms.medica.user.model.User;
import org.hms.medica.user.service.UserService;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatientService {
    private final UserAppointmentService userAppointmentService;
    private final UserService userService;
    private final PatientAppointmentMapper patientAppointmentMapper;
    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;


    public List<PatientAppointmentDto> getAppointments() {
        User user = userService.getCurrentUser();
        log.info(String.valueOf(user.getId()));
        return userAppointmentService.findUserAppointments(user).stream()
                .map(
                        (appointment) -> {
                            PatientAppointmentDto patientAppointmentDto =
                                    patientAppointmentMapper.toDto(appointment);
                            patientAppointmentDto.setDoctorId(appointment.getDoctor().getId());
                            return patientAppointmentDto;
                        })
                .collect(Collectors.toList());
    }

    public List<PatientResponseDto> getAllPatients(
            Predicate predicate, Pageable pageable
    ) {
        return patientRepository.findAll(predicate, pageable)
                .stream()
                .map(patientMapper::mapPatientToPatientResponseDto)
                .toList();
    }

    public PatientResponseDto getPatientById(Long patientId) {
        var patient =  patientRepository.findById(patientId)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Patient not found with id: " + patientId));
        return patientMapper.mapPatientToPatientResponseDto(patient);
    }

    @Transactional
    public void registerPatient(PatientDto patientDto) {
        var patient = new Patient();
        patient = patientMapper.mapPatientDtoToPatient(patientDto);
        patientRepository.save(patient);
    }

    @Transactional
    public void updatePatient(Long patientId, PatientDto patientDto) {
        var patient =  patientRepository.findById(patientId)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Patient not found with id: " + patientId));
        patientMapper.updatePatientFromDto(patientDto, patient);
    }



    public Patient findById(Long patientId) {
        return patientRepository.findById(patientId)
                .orElseThrow(() -> new UserNotFoundException("Patient Not found with id: "
                        + patientId));
    }

}
