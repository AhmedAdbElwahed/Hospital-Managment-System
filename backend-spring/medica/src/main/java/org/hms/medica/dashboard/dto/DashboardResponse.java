package org.hms.medica.dashboard.dto;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
public class DashboardResponse {

    private Long totalPatient;
    private Long todayPatient;
    private Long todayAppointment;
    private Long completedAppointment;
    private Long newPatient;
    private Long oldPatient;
}
