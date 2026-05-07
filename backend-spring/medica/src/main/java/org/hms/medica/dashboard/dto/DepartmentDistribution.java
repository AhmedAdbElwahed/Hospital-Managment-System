package org.hms.medica.dashboard.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentDistribution {
    private String departmentName;
    private long patientCount;
    private double percentage;
}
