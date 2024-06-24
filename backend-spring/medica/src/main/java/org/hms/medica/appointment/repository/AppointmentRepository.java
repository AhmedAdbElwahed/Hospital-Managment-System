package org.hms.medica.appointment.repository;

import org.hms.medica.appointment.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
  Optional<Appointment> findByPatientIdAndStartDateTime(
      Long patientId, LocalDateTime startDateTime);

  Optional<Appointment> findByDoctorIdAndStartDateTime(Long doctorId, LocalDateTime startDateTime);

  @Query(
      nativeQuery = true,
      value =
          "SELECT * FROM appointment where doctor_id = :userId OR patient_id= :userId ORDER BY start_date_time")
  List<Appointment> findAppointmentsByUserId(Long userId);
}
