package org.hms.medica.appointment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Builder
public class AppointmentDto {

  @NotNull private LocalDateTime startDateTime;
  @NotBlank private String reasonForVisit;
  @NotNull private Long doctorId;
  @NotNull private boolean isVirtual;
}
