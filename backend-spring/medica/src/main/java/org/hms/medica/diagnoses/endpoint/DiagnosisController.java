package org.hms.medica.diagnoses.endpoint;

import lombok.RequiredArgsConstructor;
import org.hms.medica.diagnoses.service.DiagnosisService;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class DiagnosisController {
    private DiagnosisService diagnosisService;
}
