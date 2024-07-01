package org.hms.medica.diagnoses.service;

import lombok.RequiredArgsConstructor;
import org.hms.medica.diagnoses.dto.DiagnosisRequestDto;
import org.hms.medica.diagnoses.dto.DiagnosisResponseDto;
import org.hms.medica.diagnoses.exception.DiagnosisNotFoundException;
import org.hms.medica.diagnoses.mapper.DiagnosisMapper;
import org.hms.medica.diagnoses.model.Diagnosis;
import org.hms.medica.diagnoses.repository.DiagnosisRepository;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.doctor.service.DoctorService;
import org.hms.medica.user.model.User;
import org.hms.medica.user.service.UserService;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DiagnosisService {
  private final DiagnosisRepository diagnosisRepository;
  private final DiagnosisMapper diagnosisMapper;
  private final UserService userService;
  private final DoctorService doctorService;

  Long createDiagnosis(DiagnosisRequestDto diagnosisRequestDto) {
    Diagnosis diagnosis = diagnosisMapper.mapToEntity(diagnosisRequestDto);
    User user = userService.getCurrentUser();
    Doctor doctor = doctorService.getDoctorById(user.getId());

    diagnosis.setDoctor(doctor);
    Diagnosis savedDiagnosis = diagnosisRepository.save(diagnosis);
    return savedDiagnosis.getId();
  }

  Diagnosis findDiagnosisById(Long id) {

    return diagnosisRepository.findById(id).orElseThrow(() -> new DiagnosisNotFoundException(id));
  }

  void updateDiagnosis(Long id, DiagnosisRequestDto diagnosisRequestDto) {

    Diagnosis diagnosis = findDiagnosisById(id);

    diagnosis.setDetails(diagnosisRequestDto.getDetails());
    diagnosisRepository.save(diagnosis);
  }

  void deleteDiagnosisById(Long id) {
    diagnosisRepository.deleteById(id);
  }

  public List<DiagnosisResponseDto> getDiagnosis(int pageSize) {
    List<Diagnosis> diagnoses = diagnosisRepository.findAll(Pageable.ofSize(pageSize)).toList();

    return diagnoses.stream().map(diagnosisMapper::mapToResponseDto).collect(Collectors.toList());
  }
}
