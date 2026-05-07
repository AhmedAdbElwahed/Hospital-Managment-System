package org.hms.medica.dashboard.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SummaryResponse {
    private long totalPatients;
    private long todayAppointments;
    private long activeAdmissions;
    private double efficiencyRate;
}
