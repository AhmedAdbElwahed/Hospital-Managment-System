package org.hms.medica.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hms.medica.constants.BloodType;
import org.hms.medica.constants.MaritalStatus;

import java.util.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Patient extends User {
  private String insurancePolicyNumber;
  private BloodType bloodType;
  private MaritalStatus maritalStatus;
  private String nationality;

  @OneToOne
  @JoinColumn(name = "patient_history_id")
  private PatientHistory patientHistory;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
      name = "patient_medications",
      joinColumns = @JoinColumn(name = "patient_id"),
      inverseJoinColumns = @JoinColumn(name = "medication_id"))
  private Set<Medication> medications = new LinkedHashSet<>();

  @OneToMany(mappedBy = "patient")
  private Set<Diagnosis> diagnoses;

  @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY)
  private Set<Admission> admissions = new HashSet<>();

  @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY)
  private Set<Appointment> appointment = new HashSet<>();

  @ManyToOne
  @JoinColumn(name = "ward_id")
  private Ward ward;
}
