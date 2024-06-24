package org.hms.medica.examination.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class ExaminationDto {
  private double oxygenSaturation;
  private double urineOutput;
  private String bowelMovement;
  private String auscultation;
  private float heartRate;
  private float weight;
  private float temperature;
  private float height;
  private Long patientId;
}
