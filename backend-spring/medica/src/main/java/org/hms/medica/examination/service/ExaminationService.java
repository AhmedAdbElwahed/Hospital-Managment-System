package org.hms.medica.examination.service;

import lombok.RequiredArgsConstructor;

import org.hms.medica.examination.dto.ExaminationDto;
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
        var examination = examinationMapper.mapToEntity(examinationdto);
        var patient = patientService.getPatientById(examinationdto.getPatientId());
        examination.setPatient(patient);
    }

    public List<ExaminationDto> getAllExaminations() {
        return examinationRepository.findAll()
                .stream()
                .map(examinationMapper::mapToDto).toList();
    }

    public ExaminationDto getExaminationById(Long id) {

        var examinaton = examinationRepository
                .findById(id)
                .orElseThrow(
                        () -> new UsernameNotFoundException(String.format("Examination with id %d Not found", id)));
        return examinationMapper.mapToDto(examinaton);
    }

    @Transactional
    public void deleteExaminationById(Long id) {
        examinationRepository.deleteById(id);
    }
}
