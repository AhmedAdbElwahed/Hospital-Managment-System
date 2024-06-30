package org.hms.medica.diagnoses.exception;

import org.hms.medica.diagnoses.model.Diagnosis;

public class DiagnosisNotFoundException extends RuntimeException {
  public DiagnosisNotFoundException(Long id) {
    super(String.format("Diagnosis Not Found with id: " + id));
  }
}
