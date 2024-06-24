package org.hms.medica.appointment.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hms.medica.appointment.dto.PatientAppointmentDto;
import org.hms.medica.appointment.mapper.PatientAppointmentMapper;
import org.hms.medica.appointment.model.Appointment;
import org.hms.medica.appointment.repository.AppointmentRepository;
import org.hms.medica.constants.AppointmentStatus;
import org.hms.medica.doctor.service.DoctorService;
import org.hms.medica.patient.model.Patient;
import org.hms.medica.patient.service.PatientService;
import org.hms.medica.user.service.UserService;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AppointmentSchedulingService {
  private final AppointmentValidator appointmentValidator;
  private final AppointmentRepository appointmentRepository;
  private final PatientAppointmentMapper patientAppointmentMapper;
  private final DoctorService doctorService;
  private final UserService userService;
  private final PatientService patientService;

  public Long scheduleAppointmentForCurrentUser(PatientAppointmentDto patientAppointmentDto) {
    Patient patient = (Patient) userService.getCurrentUser();
    return processAppointmentScheduling(patientAppointmentDto, patient);
  }

  public Long scheduleAppointmentById(
      PatientAppointmentDto patientAppointmentDto, Long patientId) {
    Patient patient = patientService.getPatientById(patientId);
    return processAppointmentScheduling(patientAppointmentDto, patient);
  }

  private Long processAppointmentScheduling(
      PatientAppointmentDto patientAppointmentDto, Patient patient) {
    Appointment appointment = mapToAppointmentEntity(patientAppointmentDto, patient);
    log.info("Processed Appointment: {}", appointment);
    appointmentValidator.validate(appointment);
    return persistAppointment(appointment).getId();
  }

  private Appointment mapToAppointmentEntity(
      PatientAppointmentDto patientAppointmentDto, Patient patient) {
    Appointment appointment = patientAppointmentMapper.toEntity(patientAppointmentDto);
    appointment.setDoctor(doctorService.getDoctorById(patientAppointmentDto.getDoctorId()));
    appointment.setPatient(patient);
    return appointment;
  }

  private Appointment persistAppointment(Appointment appointment) {
    appointment.setAppointmentStatus(AppointmentStatus.PENDING);
    return appointmentRepository.save(appointment);
  }
}
