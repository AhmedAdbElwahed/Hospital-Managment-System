package org.hms.medica.patienthistory.repo;

import org.hms.medica.patient.model.Patient;
import org.hms.medica.patienthistory.model.PatientHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientHistoryRepository extends JpaRepository<PatientHistory, Long> {
    Optional<PatientHistory> findPatientHistoryByPatient(Patient patient);
}
