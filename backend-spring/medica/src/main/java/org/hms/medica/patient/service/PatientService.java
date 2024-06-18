package org.hms.medica.patient.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hms.medica.appointment.dto.PatientAppointmentDto;
import org.hms.medica.appointment.mapper.PatientAppointmentMapper;
import org.hms.medica.appointment.service.UserAppointmentService;
import org.hms.medica.patient.model.Patient;
import org.hms.medica.patient.repo.PatientRepository;
import org.hms.medica.user.exception.UserNotFoundException;
import org.hms.medica.user.model.User;
import org.hms.medica.user.service.UserService;
import org.springframework.stereotype.Service;

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

    public Patient findById(Long patientId) {
        return patientRepository.findById(patientId)
                .orElseThrow(() -> new UserNotFoundException("Patient Not found with id: "
                        + patientId));
    }

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
}
