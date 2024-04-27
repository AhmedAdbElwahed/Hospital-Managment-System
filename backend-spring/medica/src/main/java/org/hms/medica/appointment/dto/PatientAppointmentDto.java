package org.hms.medica.appointment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PatientAppointmentDto {

  @NotNull private LocalDateTime startDateTime;
  @NotBlank private String reasonForVisit;
  @NotNull private Long doctorId;
  @NotNull private boolean isVirtual;
}
