package org.hms.medica.patienthistory.service;

import org.hms.medica.patient.model.Patient;
import org.hms.medica.patienthistory.dto.PatientHistoryDto;
import org.hms.medica.patienthistory.model.PatientHistory;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PatientHistoryService {

    List<PatientHistoryDto> getAllPatientHistories();

    PatientHistoryDto getPatientHistoryById(Long id);

    PatientHistoryDto getPatientHistoryByPatient(Patient patient);

    @Transactional
    void savePatientHistory(PatientHistoryDto patientHistoryDto);

    @Transactional
    void updatePatientHistory(PatientHistoryDto patientHistoryDto);

    @Transactional
    void deletePatientHistory(Long id);


}
