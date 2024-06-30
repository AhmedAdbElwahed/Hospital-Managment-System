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
public class ExaminationResponseDto {
    private Long patientId;
    private long id;
    private double oxygenSaturation;
    private double urineOutput;
    private String bowelMovement;
    private String auscultation;
    private double heartRate;
    private double weight;
    private double temperature;
    private double height;
}
