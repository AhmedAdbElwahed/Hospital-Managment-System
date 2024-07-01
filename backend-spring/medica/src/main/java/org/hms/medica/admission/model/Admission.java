package org.hms.medica.admission.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hms.medica.baseEntity.AuditedEntity;
import org.hms.medica.constants.AdmissionType;
import org.hms.medica.diagnoses.model.Diagnosis;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.patient.model.Patient;
import org.hms.medica.ward.model.Ward;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Admission extends AuditedEntity {

  private String diagnosisOut;

  private String diagnosisIn;

  @Enumerated(EnumType.STRING)
  private AdmissionType admissionType;

  private LocalDate admissionDate;
  private LocalDate dischargeDate;
  private int numOfBedDays;

  @ManyToOne
  @JoinColumn(name = "patient_id")
  private Patient patient;

  @ManyToOne
  @JoinColumn(name = "doctor_id")
  private Doctor doctor;
  @ManyToOne
  @JoinColumn(name = "ward_id")
  private Ward ward;
}
