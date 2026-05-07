package org.hms.medica.labtest.service;

import org.hms.medica.labtest.model.LabTest;
import org.hms.medica.labtest.repo.LabTestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LabTestService {

    private final LabTestRepository labTestRepository;

    @Autowired
    public LabTestService(LabTestRepository labTestRepository) {
        this.labTestRepository = labTestRepository;
    }

    public LabTest saveLabTest(LabTest labTest) {
        return labTestRepository.save(labTest);
    }

    public Page<LabTest> getAllLabTests(Pageable pageable) {
        return labTestRepository.findAll(pageable);
    }

    public Optional<LabTest> getLabTestById(Long id) {
        return labTestRepository.findById(id);
    }

    public void deleteLabTestById(Long id) {
        labTestRepository.deleteById(id);
    }
}
