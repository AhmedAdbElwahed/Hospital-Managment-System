package org.hms.medica.appointment.repository;

import org.hms.medica.appointment.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
  Optional<Appointment> findByPatientIdAndStartDateTime(
      Long patientId, LocalDateTime startDateTime);

  List<Appointment> findAppointmentsByPatientIdOrderByStartDateTime(Long patientId);

  List<Appointment> findAppointmentsByDoctorIdOrderByStartDateTime(Long patientId);
}
