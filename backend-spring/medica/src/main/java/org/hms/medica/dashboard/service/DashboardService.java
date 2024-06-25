package org.hms.medica.dashboard.service;

import org.hms.medica.appointment.dto.AppointmentResponseDto;
import org.hms.medica.dashboard.dto.DashboardResponse;
import org.hms.medica.patient.dto.PatientResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DashboardService {

    DashboardResponse getDashboardStatistics();

    List<AppointmentResponseDto> getTodayAppointments();

    List<PatientResponseDto> getRecentPatient();
}
