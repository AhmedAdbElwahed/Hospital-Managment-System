package org.hms.medica.examination.service;

import lombok.RequiredArgsConstructor;
import org.hms.medica.examination.dto.ExaminationDto;
import org.hms.medica.examination.mapper.ExaminationMapper;
import org.hms.medica.examination.model.Examination;
import org.hms.medica.examination.repo.ExaminationRepository;
import org.hms.medica.patient.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        examinationRepository.save(examination);
    }

    public List<Examination> getAllExaminations() {
        return examinationRepository.findAll();
    }

    public Optional<Examination> getExaminationById(Long id) {
        return examinationRepository.findById(id);
    }

    public void deleteExaminationById(Long id) {
        examinationRepository.deleteById(id);
    }
}
