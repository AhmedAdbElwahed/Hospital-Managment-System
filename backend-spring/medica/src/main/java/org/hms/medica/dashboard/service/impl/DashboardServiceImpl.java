package org.hms.medica.dashboard.service.impl;

import lombok.AllArgsConstructor;
import org.hms.medica.admission.repository.AdmissionRepository;
import org.hms.medica.admission.repository.QAdmissionRepository;
import org.hms.medica.appointment.dto.AppointmentResponseDto;
import org.hms.medica.appointment.mapper.AdminAppointmentMapper;
import org.hms.medica.appointment.repository.AppointmentRepository;
import org.hms.medica.appointment.service.UserAppointmentService;
import org.hms.medica.constants.AppointmentStatus;
import org.hms.medica.dashboard.dto.*;
import org.hms.medica.dashboard.service.DashboardService;
import org.hms.medica.patient.dto.PatientResponseDto;
import org.hms.medica.patient.repo.PatientRepository;
import org.hms.medica.patient.service.PatientService;
import org.hms.medica.ward.model.Ward;
import org.hms.medica.ward.repository.WardRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DashboardServiceImpl implements DashboardService {

        private final PatientService patientService;
        private final UserAppointmentService userAppointmentService;
        private final AdminAppointmentMapper adminAppointmentMapper;
        private final PatientRepository patientRepository;
        private final AdmissionRepository admissionRepository;
        private final QAdmissionRepository qAdmissionRepository;
        private final WardRepository wardRepository;
        private final AppointmentRepository appointmentRepository;

        @Override
        public DashboardResponse getDashboardStatistics() {
                return DashboardResponse.builder()
                                .totalPatient(patientRepository.count())
                                .todayPatient((long) patientService.findAllTodayPatients(LocalDateTime.now()).size())
                                .newPatient((long) patientService.findNewPatients().size())
                                .oldPatient((long) patientService.findOldPatients().size())
                                .todayAppointment((long) userAppointmentService
                                                .findTodayAppointments(LocalDateTime.now()).size())
                                .completedAppointment((long) userAppointmentService
                                                .findAppointmentsByStatus(AppointmentStatus.COMPLETED).size())
                                .build();
        }

        @Override
        public List<AppointmentResponseDto> getTodayAppointments() {
                return userAppointmentService.findTodayAppointments(LocalDateTime.now())
                                .stream()
                                .map(adminAppointmentMapper::mapAppointmentToAppointmentResponseDto)
                                .toList();
        }

        @Override
        public List<PatientResponseDto> getRecentPatient() {
                return patientService.findMostRecentPatients();
        }

        @Override
        public SummaryResponse getSummary() {
                long totalPatients = patientRepository.count();
                long todayAppointments = userAppointmentService.findTodayAppointments(LocalDateTime.now()).size();

                List<Ward> wards = wardRepository.findAll();
                long activeAdmissions = wards.stream().mapToLong(w -> w.getPatients().size()).sum();
                long totalBeds = wards.stream().mapToLong(Ward::getNumOfBeds).sum();

                double efficiencyRate = totalBeds > 0 ? (double) activeAdmissions / totalBeds : 0.0;

                return SummaryResponse.builder()
                                .totalPatients(totalPatients)
                                .todayAppointments(todayAppointments)
                                .activeAdmissions(activeAdmissions)
                                .efficiencyRate(efficiencyRate)
                                .build();
        }

        @Override
        public List<AdmissionTrend> getAdmissionTrends() {
                LocalDate startDate = LocalDate.now().minusDays(30);
                return qAdmissionRepository.findAdmissionTrends(startDate).stream()
                                .map(tuple -> AdmissionTrend.builder()
                                                .date(tuple.get(0, LocalDate.class))
                                                .count(tuple.get(1, Long.class))
                                                .build())
                                .toList();
        }

        @Override
        public List<RecentActivity> getRecentActivity() {
                List<RecentActivity> activities = new ArrayList<>();

                // Recent Patients
                patientRepository.findAll(PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "createdDate")))
                                .forEach(p -> activities.add(RecentActivity.builder()
                                                .id(p.getId())
                                                .type("PATIENT_REGISTERED")
                                                .message("New patient " + p.getFirstname() + " " + p.getLastname()
                                                                + " registered")
                                                .timestamp(p.getCreatedDate())
                                                .build()));

                // Recent Admissions
                admissionRepository.findAll(PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "createdDate")))
                                .forEach(a -> activities.add(RecentActivity.builder()
                                                .id(a.getId())
                                                .type("PATIENT_ADMITTED")
                                                .message("Patient " + a.getPatient().getFirstname() + " admitted to "
                                                                + a.getWard().getName())
                                                .timestamp(a.getCreatedDate())
                                                .build()));

                // Recent Appointments
                appointmentRepository.findAll(PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "createdDate")))
                                .forEach(app -> activities.add(RecentActivity.builder()
                                                .id(app.getId())
                                                .type("APPOINTMENT_SCHEDULED")
                                                .message("Appointment scheduled for patient "
                                                                + app.getPatient().getFirstname())
                                                .timestamp(app.getCreatedDate())
                                                .build()));

                return activities.stream()
                                .sorted(Comparator.comparing(RecentActivity::getTimestamp).reversed())
                                .limit(20)
                                .collect(Collectors.toList());
        }

        @Override
        public List<DepartmentDistribution> getDepartmentDistribution() {
                List<Ward> wards = wardRepository.findAll();
                long totalPatients = wards.stream().mapToLong(w -> w.getPatients().size()).sum();

                return wards.stream()
                                .map(w -> DepartmentDistribution.builder()
                                                .departmentName(w.getName())
                                                .patientCount(w.getPatients().size())
                                                .percentage(totalPatients > 0
                                                                ? (double) w.getPatients().size() / totalPatients * 100
                                                                : 0.0)
                                                .build())
                                .toList();
        }
}
