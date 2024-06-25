package org.hms.medica.appointment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.time.LocalTime;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class DoctorAppointmentDto {
    @NotNull
    private LocalTime startTime;
    @NotBlank
    private String reasonForVisit;
    @NotNull
    private Long patientId;
    @NotNull
    private boolean isVirtual;
}
