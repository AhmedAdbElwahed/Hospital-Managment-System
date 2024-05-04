package org.hms.medica.examination.service;

import org.hms.medica.examination.model.Examination;
import org.hms.medica.examination.repo.ExaminationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ExaminationService {

    private final ExaminationRepository examinationRepository;

    @Autowired
    public ExaminationService(ExaminationRepository examinationRepository) {
        this.examinationRepository = examinationRepository;
    }

    public Examination saveExamination(Examination examination) {
        return examinationRepository.save(examination);
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
