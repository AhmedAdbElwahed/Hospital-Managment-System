package org.hms.medica.admissions.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hms.medica.baseEntity.BaseEntity;
import org.hms.medica.constants.AdmissionType;
import org.hms.medica.diagnoses.model.Diagnosis;
import org.hms.medica.patient.model.Patient;
import org.hms.medica.ward.model.Ward;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Admission extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime admissionDate;

    // i made the diagnosis String for now
    @OneToOne
    @JoinColumn(name = "diagnosis_out_id")
    private Diagnosis diagnosisOut;

    @OneToOne
    @JoinColumn(name = "diagnosis_in_id")
    private Diagnosis diagnosisIn;

    @Enumerated(EnumType.STRING)
    private AdmissionType admissionType;

    @Enumerated(EnumType.STRING)
    private AdmissionType dischargeType;

    private LocalDateTime dischargeDate;
    private int bedDays;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "ward_id")
    private Ward ward;
}