package org.hms.medica.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Visit extends BaseEntity {

  private LocalDateTime date;
  private float duration;
  private String note;
  private String prescriptionDetails;
  private String treatmentDetails;

  @OneToOne
  @JoinColumn(name = "daignosis_id")
  private Diagnosis diagnosis;

  @OneToOne
  @JoinColumn(name = "doctor_id")
  private Doctor doctor;

  @JoinColumn(name = "patient_id")
  @OneToOne
  private Patient patient;

  @OneToOne
  @JoinColumn(name = "prescription_id")
  private Prescription prescription;
}
