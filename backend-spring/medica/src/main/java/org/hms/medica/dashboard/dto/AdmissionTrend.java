package org.hms.medica.dashboard.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdmissionTrend {
    private LocalDate date;
    private long count;
}
