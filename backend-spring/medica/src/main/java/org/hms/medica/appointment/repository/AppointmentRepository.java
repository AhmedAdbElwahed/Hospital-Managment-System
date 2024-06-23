package org.hms.medica.appointment.repository;

import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import org.hms.medica.appointment.model.Appointment;
import org.hms.medica.appointment.model.QAppointment;
import org.hms.medica.doctor.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long>,
        QuerydslPredicateExecutor<Appointment>, QuerydslBinderCustomizer<QAppointment> {
  Optional<Appointment> findByPatientIdAndStartTime(
      Long patientId, LocalTime startTime);

  @Query(
      nativeQuery = true,
      value =
          "SELECT * FROM appointment where doctor_id = :userId OR patient_id= :userId ORDER BY start_date_time")
  List<Appointment> findAppointmentsByUserId(Long userId);

  Optional<Appointment> findAppointmentByStartTimeAndDoctor(LocalTime startTime, Doctor doctor);

  @Override
  default void customize(QuerydslBindings bindings, @NonNull QAppointment appointment) {
    bindings.bind(String.class)
            .first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
  }
}
