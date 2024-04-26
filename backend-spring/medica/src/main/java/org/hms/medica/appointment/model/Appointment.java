package org.hms.medica.appointment.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hms.medica.baseEntity.AuditedEntity;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.patient.model.Patient;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Appointment extends AuditedEntity {

  private LocalDateTime startDateTime;
  private String reasonForVisit;
  private boolean isVirtual;

  @ManyToOne
  @JoinColumn(name = "patient_id")
  private Patient patient;

  @ManyToOne
  @JoinColumn(name = "doctor_id")
  private Doctor doctor;
}
