package org.hms.medica.appointment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

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
    @NotNull
    private boolean isVirtual;
}
