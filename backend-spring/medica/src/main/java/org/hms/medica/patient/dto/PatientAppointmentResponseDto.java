package org.hms.medica.patient.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import org.hms.medica.constants.AppointmentStatus;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.patient.model.Patient;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class PatientAppointmentResponseDto {
  private Long AppointmentId;
  private LocalTime startTime;
  private String reasonForVisit;
  private boolean isVirtual;
  private boolean paid;

  private AppointmentStatus appointmentStatus;

  private Long doctorId;
}
