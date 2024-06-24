package org.hms.medica.appointment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hms.medica.constants.AppointmentStatus;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class AppointmentResponseDto {


    private Long id;
    @NotNull
    private LocalTime startTime;
    @NotBlank
    private String reasonForVisit;
    @NotNull
    private String doctorName;
    @NotNull
    private String patientName;

    private AppointmentStatus appointmentStatus;

    private LocalDateTime createdAt;
    @NotNull
    private boolean isVirtual;
}
