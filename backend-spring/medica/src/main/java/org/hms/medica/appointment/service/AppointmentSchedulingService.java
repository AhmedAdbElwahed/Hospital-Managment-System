package org.hms.medica.appointment.service;

import lombok.RequiredArgsConstructor;
import org.hms.medica.appointment.dto.PatientAppointmentDto;
import org.hms.medica.appointment.mapper.PatientAppointmentMapper;
import org.hms.medica.appointment.model.Appointment;
import org.hms.medica.appointment.repository.AppointmentRepository;
import org.hms.medica.doctor.service.DoctorService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppointmentSchedulingService {
  private final AppointmentValidator appointmentValidator;
  private final AppointmentRepository appointmentRepository;
  private final PatientAppointmentMapper patientAppointmentMapper;
  private final DoctorService doctorService;

  public Long scheduleAppointment(PatientAppointmentDto patientAppointmentDto) {
    Appointment appointment = patientAppointmentMapper.toEntity(patientAppointmentDto);
    appointment.setDoctor(doctorService.getDoctorById(patientAppointmentDto.getDoctorId()));
    appointmentValidator.validate(appointment);
    Appointment savedAppointment = appointmentRepository.save(appointment);
    return savedAppointment.getId();
  }
}
