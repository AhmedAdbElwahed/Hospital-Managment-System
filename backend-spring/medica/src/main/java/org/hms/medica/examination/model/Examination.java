package org.hms.medica.examination.model;

import lombok.*;
import java.time.LocalDateTime;
import org.hms.medica.admission.model.Admission;
import org.hms.medica.baseEntity.AuditedEntity;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.patient.model.Patient;
import jakarta.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Examination extends AuditedEntity {
  private double oxygenSaturation;
  private double urineOutput;
  private String bowelMovement;
  private String auscultation;
  private float heartRate;
  private float weight;
  private float temperature;
  private float height;

  @ManyToOne
  @JoinColumn(name = "admission_id")
  private Admission admission;

  @ManyToOne
  @JoinColumn(name = "patient_id")
  private Patient patient;

  @ManyToOne
  @JoinColumn(name = "doctor_id")
  private Doctor doctor;
}
