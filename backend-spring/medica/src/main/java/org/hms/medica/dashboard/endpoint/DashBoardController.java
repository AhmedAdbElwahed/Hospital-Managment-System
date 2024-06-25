package org.hms.medica.dashboard.endpoint;


import lombok.AllArgsConstructor;
import org.hms.medica.appointment.dto.AppointmentResponseDto;
import org.hms.medica.dashboard.dto.DashboardResponse;
import org.hms.medica.dashboard.service.DashboardService;
import org.hms.medica.patient.dto.PatientResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("hms/v1/dashboard")
public class DashBoardController {

    private DashboardService dashboardService;

    @GetMapping("/statistics")
    public ResponseEntity<DashboardResponse> getDashBoardStatistics() {
        return ResponseEntity.status(HttpStatus.OK).body(dashboardService.getDashboardStatistics());
    }

    @GetMapping("/today-appointments")
    public ResponseEntity<List<AppointmentResponseDto>> getTodayAppointments() {
        return ResponseEntity.status(HttpStatus.OK).body(dashboardService.getTodayAppointments());
    }

    @GetMapping("/recent-patients")
    public ResponseEntity<List<PatientResponseDto>> getRecentPatients() {
        return ResponseEntity.status(HttpStatus.OK).body(dashboardService.getRecentPatient());
    }
}
