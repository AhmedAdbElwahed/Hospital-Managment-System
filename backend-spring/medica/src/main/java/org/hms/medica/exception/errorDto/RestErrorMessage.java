package org.hms.medica.exception.errorDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RestErrorMessage {

    private String timestamp;
    private Integer statusCode;
    private String error;
    private String message;
    private String path;
}
