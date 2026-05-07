package org.hms.medica.dashboard.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecentActivity {
    private Long id;
    private String type;
    private String message;
    private LocalDateTime timestamp;
}
