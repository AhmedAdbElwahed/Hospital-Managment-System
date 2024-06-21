package org.hms.medica.patient.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hms.medica.admission.model.Admission;
import org.hms.medica.appointment.model.Appointment;
import org.hms.medica.constants.BloodType;
import org.hms.medica.constants.MaritalStatus;
import org.hms.medica.diagnoses.model.Diagnosis;
import org.hms.medica.medication.model.Medication;
import org.hms.medica.patienthistory.model.PatientHistory;
import org.hms.medica.user.model.User;
import org.hms.medica.ward.model.Ward;

import java.util.*;

@Entity
@Setter
@Getter
@SuperBuilder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Patient extends User{


  private String insurancePolicyNumber;
  private BloodType bloodType;
  private MaritalStatus maritalStatus;
  private String nationality;

  @OneToOne(mappedBy = "patient")
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

