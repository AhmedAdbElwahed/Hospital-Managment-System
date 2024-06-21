package org.hms.medica.patienthistory.service.impl;


import lombok.AllArgsConstructor;
import org.hms.medica.patient.model.Patient;
import org.hms.medica.patient.service.PatientService;
import org.hms.medica.patienthistory.dto.PatientHistoryDto;
import org.hms.medica.patienthistory.mapper.PatientHistoryMapper;
import org.hms.medica.patienthistory.repo.PatientHistoryRepository;
import org.hms.medica.patienthistory.service.PatientHistoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class PatientHistoryServiceImpl implements PatientHistoryService {

    private PatientHistoryRepository patientHistoryRepository;
    private PatientHistoryMapper patientHistoryMapper;
    private PatientService patientService;

    @Override
    public List<PatientHistoryDto> getAllPatientHistories() {
        return patientHistoryRepository.findAll().stream()
                .map(patientHistoryMapper::mapPatientHistoryToPatientHistoryDto)
                .toList();
    }

    @Override
    public PatientHistoryDto getPatientHistoryById(Long id) {
        var patientHistory = patientHistoryRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Can not find patient history with id: " + id));
        return patientHistoryMapper.mapPatientHistoryToPatientHistoryDto(patientHistory);
    }

    @Override
    public PatientHistoryDto getPatientHistoryByPatient(Patient patient) {
        var patientHistory = patientHistoryRepository.findPatientHistoryByPatient(patient).orElseThrow(() ->
                new RuntimeException(String.format("Can not find patient history with patient: %s %s",
                        patient.getFirstname(), patient.getLastname())));
        return patientHistoryMapper.mapPatientHistoryToPatientHistoryDto(patientHistory);
    }

    @Override
    public void savePatientHistory(PatientHistoryDto patientHistoryDto) {
        var patientHistory = patientHistoryMapper.mapPatientHistoryDtoToPatientHistory(patientHistoryDto);
        var patient = patientService.findById(patientHistoryDto.getPatientId());
        patientHistory.setPatient(patient);
        patientHistoryRepository.save(patientHistory);
    }

    @Override
    public void updatePatientHistory(PatientHistoryDto patientHistoryDto) {
        var patientHistory = patientHistoryRepository.findById(patientHistoryDto.getId()).orElseThrow(() ->
                new RuntimeException("Can not find patient history with id: " + patientHistoryDto.getId()));
        patientHistoryMapper.updatePatientHistory(patientHistoryDto, patientHistory);
        if (patientHistoryDto.getPatientId() > 0 &&
                !(patientHistoryDto.getPatientId().equals(patientHistory.getPatient().getId()))) {
            var patient = patientService.findById(patientHistoryDto.getPatientId());
            patientHistory.setPatient(patient);
        }
        patientHistoryRepository.save(patientHistory);
    }

    @Override
    public void deletePatientHistory(Long id) {
        patientHistoryRepository.deleteById(id);
    }
}
