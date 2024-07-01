package org.hms.medica.admission.service;

import lombok.RequiredArgsConstructor;
import org.hms.medica.admission.dto.AdmissionRequestDto;
import org.hms.medica.admission.dto.AdmissionResponseDto;
import org.hms.medica.admission.mapper.AdmissionMapper;
import org.hms.medica.admission.model.Admission;
import org.hms.medica.admission.repository.AdmissionRepository;
import org.hms.medica.diagnoses.model.Diagnosis;
import org.hms.medica.patient.model.Patient;
import org.hms.medica.patient.service.PatientService;
import org.hms.medica.ward.model.Ward;
import org.hms.medica.ward.service.WardService;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdmissionService {
  private final PatientService patientService;
  private final WardService wardService;
  private final AdmissionRepository admissionRepository;
  private final AdmissionMapper admissionMapper;

  public Long admitPatient(AdmissionRequestDto admissionRequestDto) {
    Patient patient = patientService.findById(admissionRequestDto.getPatientId());
    Admission admission =
        Admission.builder()
            .patient(patient)
            .admissionType(admissionRequestDto.getAdmissionType())
            .build();

    Ward ward = wardService.admitToWard(admission, admissionRequestDto.getWardId());
    admission.setWard(ward);
    admission = admissionRepository.save(admission);
    return admission.getId();
  }

  public List<AdmissionResponseDto> getAdmissions(int pageSize) {
    List<Admission> admissions = admissionRepository.findAll(Pageable.ofSize(pageSize)).toList();

    return admissions.stream().map(admissionMapper::mapToResponseDto).collect(Collectors.toList());
  }

  public AdmissionResponseDto findAdmissionById(Long id) {
    Admission admission =
        admissionRepository
            .findById(id)
            .orElseThrow(() -> new RuntimeException("Admission not found with id: " + id));

    return admissionMapper.mapToResponseDto(admission);
  }

  public void deleteAdmissionById(Long admissionId) {
    admissionRepository.deleteById(admissionId);
  }

  public void updateAdmissionById(Long admissionId, AdmissionRequestDto admissionRequestDto) {
    Admission admission =
        admissionRepository
            .findById(admissionId)
            .orElseThrow(() -> new RuntimeException("Admission not found"));

    admission.setAdmissionType(admissionRequestDto.getAdmissionType());
    admission.setDiagnosisIn(admissionRequestDto.getDiagnosisIn());
    admission.setDiagnosisOut(admissionRequestDto.getDiagnosisOut());
    admission.setDischargeDate(admissionRequestDto.getDischargeDate());
    admission.setAdmissionDate(admissionRequestDto.getAdmissionDate());

    Ward ward = wardService.findWardById(admissionRequestDto.getWardId());
    Patient patient = patientService.getPatientById(admissionRequestDto.getPatientId());

    admission.setPatient(patient);
    admission.setWard(ward);
    admission.setNumOfBedDays(admissionRequestDto.getNumOfBedDays());

    admissionRepository.save(admission);
  }
}
