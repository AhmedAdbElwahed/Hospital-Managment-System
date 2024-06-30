package org.hms.medica.examination.model;

import lombok.*;

import java.time.LocalDateTime;

import lombok.experimental.SuperBuilder;
import org.hms.medica.admission.model.Admission;
import org.hms.medica.baseEntity.AuditedEntity;
import org.hms.medica.constants.AuscultationFinding;
import org.hms.medica.constants.BowelMovement;
import org.hms.medica.patient.model.Patient;

import jakarta.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
public class Examination extends AuditedEntity {
  private double oxygenSaturation;
  private double urineOutput;
  @Enumerated(EnumType.STRING)
  private BowelMovement bowelMovement;
  @Enumerated(EnumType.STRING)
  private AuscultationFinding auscultation;
  private double heartRate;
  private double weight;
  private double temperature;
  private double height;

  @ManyToOne
  @JoinColumn(name = "admission_id")
  private Admission admission;

  @ManyToOne
  @JoinColumn(name = "patient_id")
  private Patient patient;
}
// ex_id: Examination ID
// ex_sat: Oxygen saturation
// ex_diuresis: Urine output
// ex_bowel: Bowel movement
// ex_auscultation: Results of listening to a patient's internal sounds with a
// stethoscope
// ex_hr: Heart rate
// ex_weight: Weight
// ex_temp: Temperature
// ex_date: Examination date
// ex_height: Height
// Admission_ID: Admission ID number
// patient_id: Patient ID number
