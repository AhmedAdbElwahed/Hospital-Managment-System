package org.hms.medica.appointment.service;

import lombok.RequiredArgsConstructor;
import org.hms.medica.appointment.dto.AppointmentDto;
import org.hms.medica.appointment.mapper.AppointmentMapper;
import org.hms.medica.appointment.model.Appointment;
import org.hms.medica.appointment.repository.AppointmentRepository;
import org.hms.medica.doctor.service.DoctorService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentSchedulingService {
  private final AppointmentValidator appointmentValidator;
  private final AppointmentRepository appointmentRepository;
  private final AppointmentMapper appointmentMapper;
  private final DoctorService doctorService;

  public Long scheduleAppointment(AppointmentDto appointmentDto) {
    Appointment appointment = appointmentMapper.toEntity(appointmentDto);
    appointment.setDoctor(doctorService.getDoctorById(appointmentDto.getDoctorId()));
    appointmentValidator.validate(appointment);
    Appointment savedAppointment = appointmentRepository.save(appointment);
    return savedAppointment.getId();
  }

  public List<AppointmentDto> findPatientAppointments(Long patientId) {
    return appointmentRepository.findAppointmentsByPatientIdOrderByStartDateTime(patientId).stream()
        .map(appointmentMapper::toDto)
        .collect(Collectors.toList());
  }

  public List<AppointmentDto> findDoctorAppointments(Long doctorId) {
    return appointmentRepository.findAppointmentsByPatientIdOrderByStartDateTime(doctorId).stream()
        .map(appointmentMapper::toDto)
        .collect(Collectors.toList());
  }
}
