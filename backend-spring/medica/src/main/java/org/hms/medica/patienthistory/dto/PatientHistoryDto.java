package org.hms.medica.patienthistory.dto;


import lombok.*;
import lombok.experimental.SuperBuilder;

@Setter
@Getter
@SuperBuilder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PatientHistoryDto {
    private  Long id;
    private boolean hasPhysDiuresis;
    private boolean hasPhysDiet;
    private boolean hasPhysDrugs;
    private boolean hasPhysAlvo;
    private boolean hasPhysPregnancies;
    private boolean hasPhysAlcohol;
    private boolean hasPhysSmoke;
    private boolean hasPhysPeriod;


    private boolean hasPastCardio;
    private boolean hasPastCancer;
    private boolean hasPastHyp;
    private boolean hasPastNothing;
    private boolean hasPastInfect;
    private boolean hasPastOrto;
    private boolean hasPastDrugAdd;
    private boolean hasPastEndo;
    private boolean hasPastResp;
    private String pastNotes;

    private boolean hasFamCardio;
    private boolean hasFamCancer;
    private boolean hasFamHyp;
    private boolean hasFamNothing;
    private boolean hasFamInfect;
    private boolean hasFamOrto;
    private boolean hasFamDrugAdd;
    private boolean hasFamEndo;
    private boolean hasFamResp;
    private String familyNotes;

    private String allergies;
    private String usualMedic;
    private String surgeries;
    private String additionalNote;


    private String notes;

    private Long patientId;
}
