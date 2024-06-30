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
        Admission admission = Admission
                .builder()
                .patient(patient)
                .admissionType(admissionRequestDto.getAdmissionType())
                .build();
        if(admissionRequestDto.getDiagnosisIn() != null){
            Diagnosis dIn = new Diagnosis();
            dIn.setDetails(admissionRequestDto.getDiagnosisIn());
            admission.setDiagnosisIn(dIn);
        }

        if(admissionRequestDto.getDiagnosisOut() != null){
            Diagnosis dOut = new Diagnosis();
            dOut.setDetails(admissionRequestDto.getDiagnosisIn());
            admission.setDiagnosisIn(dOut);
        }

        Ward ward = wardService.admitToWard(admission, admissionRequestDto.getWardName());
        admission.setWard(ward);
        admission = admissionRepository.save(admission);
        return admission.getId();
    }

    public List<AdmissionResponseDto> getAdmissions() {
        List<Admission> admissions = admissionRepository.findAll();

        return admissions
                .stream()
                .map(admissionMapper::toDto)
                .collect(Collectors.toList());
    }
}
