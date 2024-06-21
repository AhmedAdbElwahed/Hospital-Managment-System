package org.hms.medica.patienthistory.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hms.medica.baseEntity.AuditedEntity;
import org.hms.medica.patient.model.Patient;

@Entity
@Table(name = "patient_history")
@Setter
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class PatientHistory extends AuditedEntity {

    private boolean hasPastCardio;
    private boolean hasPhysDiuresis;
    private boolean hasPhysDiet;
    private boolean hasPhysDrugs;
    private boolean hasPhysAlvo;
    private boolean hasPhysPregnancies;
    private boolean hasPastNothing;
    private boolean hasPastEndo;
    private boolean hasPastResp;
    private boolean hasPastOrto;
    private boolean hasPastInfect;
    private boolean hasPastHyp;
    private boolean hasPastDrugAdd;
    private boolean hasPastNote;
    private boolean hasPastCancer;
    private boolean hasPastOther;
    private boolean hasFamCardio;
    private boolean hasFamCancer;
    private boolean hasFamHyp;
    private boolean hasFamNote;
    private boolean hasFamDrugOther;
    private boolean hasFamNothing;
    private boolean hasAllergies;
    private boolean hasUsualMedic;
    private boolean hasSurgeries;
    private boolean hasFamInfect;
    private boolean hasPhysAlcohol;
    private boolean hasPhysSmoke;
    private boolean hasPhysPeriod;
    private boolean hasNotes;
    private boolean hasFamOther;
    private boolean hasFamOrto;
    private boolean hasFamDrugAdd;
    private boolean hasFamEndo;
    private boolean hasFamResp;

    @OneToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
}