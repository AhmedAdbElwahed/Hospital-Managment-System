package org.hms.medica.examination.service;

import lombok.RequiredArgsConstructor;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.doctor.service.DoctorService;
import org.hms.medica.examination.dto.ExaminationDto;
import org.hms.medica.examination.mapper.ExaminationMapper;
import org.hms.medica.examination.model.Examination;
import org.hms.medica.examination.repo.ExaminationRepository;
import org.hms.medica.user.model.User;
import org.hms.medica.user.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExaminationService {

  private final ExaminationRepository examinationRepository;
  private final UserService userService;
  private final DoctorService doctorService;
  private final ExaminationMapper examinationMapper;

  public Long createExamination(ExaminationDto examinationDto) {
    User currentUser = userService.getCurrentUser();
    Doctor doctor = doctorService.getDoctorById(currentUser.getId());

    Examination examination = examinationMapper.mapToEntity(examinationDto);
    examination.setDoctor(doctor);
    return saveExamination(examination);
  }

  private Long saveExamination(Examination examination) {
    Examination savedExamination = examinationRepository.save(examination);
    return savedExamination.getId();
  }

  public List<Examination> retrieveAllExaminations() {
    return examinationRepository.findAll();
  }

  public Optional<Examination> findExaminationById(Long id) {
    return examinationRepository.findById(id);
  }

  public void removeExaminationById(Long id) {
    examinationRepository.deleteById(id);
  }
}
