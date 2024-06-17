package org.hms.medica.labtest.service;

import org.hms.medica.labtest.model.LabTest;
import org.hms.medica.labtest.repo.LabTestRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public List<LabTest> getAllLabTests() {
        return labTestRepository.findAll();
    }

    public Optional<LabTest> getLabTestById(Long id) {
        return labTestRepository.findById(id);
    }

    public void deleteLabTestById(Long id) {
        labTestRepository.deleteById(id);
    }
}
