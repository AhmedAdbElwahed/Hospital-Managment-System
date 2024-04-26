package org.hms.medica.diagnoses.model;

import jakarta.persistence.*;
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
public class Diagnosis extends AuditedEntity {

    private String details;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
}