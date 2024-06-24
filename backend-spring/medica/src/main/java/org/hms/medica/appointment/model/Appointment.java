package org.hms.medica.appointment.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

import lombok.*;
import org.hms.medica.baseEntity.AuditedEntity;
import org.hms.medica.constants.AppointmentStatus;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.patient.model.Patient;

@Entity
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Appointment extends AuditedEntity {

  private LocalTime startTime;
  private String reasonForVisit;
  private boolean isVirtual;

  @Enumerated(EnumType.STRING)
  private AppointmentStatus appointmentStatus;

  @ManyToOne
  @JoinColumn(name = "patient_id")
  private Patient patient;

  @ManyToOne
  @JoinColumn(name = "doctor_id")
  private Doctor doctor;
}
