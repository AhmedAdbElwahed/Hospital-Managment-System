package org.hms.medica.appointment.endpoint;

import com.querydsl.core.types.Predicate;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.hms.medica.appointment.dto.AppointmentResponseDto;
import org.hms.medica.appointment.dto.AppointmentStatusDto;
import org.hms.medica.appointment.dto.PatientAppointmentDto;
import org.hms.medica.appointment.model.Appointment;
import org.hms.medica.appointment.repository.AppointmentRepository;
import org.hms.medica.appointment.service.AppointmentSchedulingService;
import org.hms.medica.appointment.service.UserAppointmentService;
import org.hms.medica.patient.model.Patient;
import org.hms.medica.patient.repo.PatientRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/appointments")
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentSchedulingService appointmentSchedulingService;
    private final UserAppointmentService userAppointmentService;

    @PreAuthorize("hasRole('ROLE_PATIENT')")
    @PostMapping
    public ResponseEntity<String> scheduleAppointmentForCurrentUser(
            @Valid @RequestBody PatientAppointmentDto patientAppointmentDto) {
        Long appointmentId =
                appointmentSchedulingService.scheduleAppointmentForCurrentUser(patientAppointmentDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Appointment created with id " + appointmentId);
    }

    @GetMapping()
    public ResponseEntity<List<AppointmentResponseDto>> fetchAllAppointments(
            @QuerydslPredicate(root = Appointment.class, bindings = AppointmentRepository.class)
            Predicate predicate,
            Pageable pageable
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(userAppointmentService.findAllAppointments(predicate, pageable));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/patients/{patientId}")
    public ResponseEntity<String> scheduleAppointmentForPatient(
            @Valid @RequestBody PatientAppointmentDto patientAppointmentDto,
            @PathVariable Long patientId) {
        System.out.println("Patient Appointment: " + patientAppointmentDto);
        Long appointmentId =
                appointmentSchedulingService.scheduleAppointmentById(patientAppointmentDto, patientId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Appointment created with id " + appointmentId);
    }

    @PostMapping("/change-status")
    public ResponseEntity<String> changeAppointmentStatus(
            @RequestBody AppointmentStatusDto appointmentStatusDto
            ) {
        userAppointmentService.changeAppointmentStatus(appointmentStatusDto);
        return ResponseEntity.status(HttpStatus.OK).body("Appointment Status Changed Successfully");
    }

    @DeleteMapping("/delete-by-id/{id}")
    public ResponseEntity<String> deleteAppointmentById(@PathVariable(name = "id") Long appointmentId) {
        userAppointmentService.deleteAppointment(appointmentId);
        return ResponseEntity.status(HttpStatus.OK).body("Appointment deleted Successfully");
    }

}
