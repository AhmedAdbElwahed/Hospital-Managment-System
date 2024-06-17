package org.hms.medica.exption.errorDto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class RestErrorMessage {

    private String timestamp;
    private Integer statusCode;
    private String error;
    private String message;
    private String path;
}
