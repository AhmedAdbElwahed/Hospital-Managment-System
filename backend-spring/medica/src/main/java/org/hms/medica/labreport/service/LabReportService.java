package org.hms.medica.labreport.service;

import org.hms.medica.labreport.model.LabReport;
import org.hms.medica.labreport.repo.LabReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LabReportService {

    private final LabReportRepository labReportRepository;

    @Autowired
    public LabReportService(LabReportRepository labReportRepository) {
        this.labReportRepository = labReportRepository;
    }

    public LabReport createLabReport(LabReport labReport) {
        return labReportRepository.save(labReport);
    }

    public List<LabReport> getAllLabReports() {
        return labReportRepository.findAll();
    }

    public Optional<LabReport> getLabReportById(Long id) {
        return labReportRepository.findById(id);
    }

    public LabReport updateLabReport(Long id, LabReport labReport) {
        if (labReportRepository.existsById(id)) {
            labReport.setId(id);
            return labReportRepository.save(labReport);
        } else {
            throw new RuntimeException("LabReport with id " + id + " not found");
        }
    }

    public void deleteLabReport(Long id) {
        labReportRepository.deleteById(id);
    }
}
