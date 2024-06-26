package org.hms.medica.examination.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class ExaminationDto {
    private Long patientId;
    private double oxygenSaturation;
    private double urineOutput;
    private String bowelMovement;
    private String auscultation;
    private double heartRate;
    private double weight;
    private double temperature;
    private double height;
}
