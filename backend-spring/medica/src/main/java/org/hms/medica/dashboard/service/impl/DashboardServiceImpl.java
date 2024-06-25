package org.hms.medica.dashboard.service.impl;

import lombok.AllArgsConstructor;
import org.hms.medica.appointment.dto.AppointmentResponseDto;
import org.hms.medica.appointment.mapper.AdminAppointmentMapper;
import org.hms.medica.appointment.service.UserAppointmentService;
import org.hms.medica.constants.AppointmentStatus;
import org.hms.medica.dashboard.dto.DashboardResponse;
import org.hms.medica.dashboard.service.DashboardService;
import org.hms.medica.patient.dto.PatientResponseDto;
import org.hms.medica.patient.service.PatientService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private PatientService patientService;
    private UserAppointmentService appointmentService;
    private AdminAppointmentMapper adminAppointmentMapper;

    @Override
    public DashboardResponse getDashboardStatistics() {
        return DashboardResponse.builder()
                .totalPatient((long) patientService.findAllPatients().size())
                .todayPatient((long) patientService.findAllTodayPatients(LocalDateTime.now()).size())
                .newPatient((long) patientService.findNewPatients().size())
                .oldPatient((long) patientService.findOldPatients().size())
                .todayAppointment((long) appointmentService.findTodayAppointments(LocalDateTime.now()).size())
                .completedAppointment((long) appointmentService.
                        findAppointmentsByStatus(AppointmentStatus.COMPLETED).size())
                .build();
    }

    @Override
    public List<AppointmentResponseDto> getTodayAppointments() {
        return appointmentService.findTodayAppointments(LocalDateTime.now())
                .stream()
                .map(adminAppointmentMapper::mapAppointmentToAppointmentResponseDto)
                .toList();
    }

    @Override
    public List<PatientResponseDto> getRecentPatient() {
        return patientService.findMostRecentPatients();
    }


}
