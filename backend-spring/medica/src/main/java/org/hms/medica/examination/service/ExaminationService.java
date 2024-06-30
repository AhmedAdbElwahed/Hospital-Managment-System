package org.hms.medica.examination.service;

import lombok.RequiredArgsConstructor;

import org.hms.medica.constants.AuscultationFinding;
import org.hms.medica.constants.BowelMovement;
import org.hms.medica.examination.dto.ExaminationDto;
import org.hms.medica.examination.dto.ExaminationResponseDto;
import org.hms.medica.examination.mapper.ExaminationMapper;
import org.hms.medica.examination.model.Examination;
import org.hms.medica.examination.repo.ExaminationRepository;
import org.hms.medica.patient.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExaminationService {

    private final ExaminationRepository examinationRepository;
    private final PatientService patientService;
    private final ExaminationMapper examinationMapper;


    public void saveExamination(ExaminationDto examinationdto) {
        var examination = Examination.builder()
                .height(examinationdto.getHeight())
                .weight(examinationdto.getWeight())
                .heartRate(examinationdto.getHeartRate())
                .bowelMovement(BowelMovement.valueOf(examinationdto.getBowelMovement()))
                .auscultation(AuscultationFinding.valueOf(examinationdto.getAuscultation()))
                .oxygenSaturation(examinationdto.getOxygenSaturation())
                .temperature(examinationdto.getTemperature())
                .build();
        var patient = patientService.getPatientById(examinationdto.getPatientId());
        examination.setPatient(patient);
        examinationRepository.save(examination);
    }

    public List<ExaminationResponseDto> getAllExaminations() {
        return examinationRepository.findAll()
                .stream()
                .map(examinationMapper::mapToDto).toList();
    }

    public ExaminationResponseDto getExaminationById(Long id) {

        var examination = examinationRepository
                .findById(id)
                .orElseThrow(
                        () -> new UsernameNotFoundException(String.format("Examination with id %d Not found", id)));
        return examinationMapper.mapToDto(examination);
    }

    @Transactional
    public void deleteExaminationById(Long id) {
        examinationRepository.deleteById(id);
    }
}
