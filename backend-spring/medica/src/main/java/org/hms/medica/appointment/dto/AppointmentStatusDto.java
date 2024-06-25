package org.hms.medica.appointment.dto;

import lombok.*;
import org.hms.medica.constants.AppointmentStatus;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AppointmentStatusDto {

    private Long appointmentId;
    private AppointmentStatus appointmentStatus;
}
