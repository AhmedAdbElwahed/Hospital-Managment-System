package org.hms.medica.search.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.doctor.repo.DoctorRepository;
import org.hms.medica.patient.model.Patient;
import org.hms.medica.patient.repo.PatientRepository;
import org.hms.medica.search.model.DoctorIndex;
import org.hms.medica.search.model.PatientIndex;
import org.hms.medica.search.repository.DoctorSearchRepository;
import org.hms.medica.search.repository.PatientSearchRepository;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@ConditionalOnProperty(name = "elasticsearch.enabled", havingValue = "true")
public class SearchService {

    private final PatientSearchRepository patientSearchRepository;
    private final DoctorSearchRepository doctorSearchRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public List<PatientIndex> searchPatients(String query) {
        return patientSearchRepository.findByFirstnameContainingOrLastnameContainingOrEmailContainingOrPhoneContaining(
                query, query, query, query);
    }

    public List<DoctorIndex> searchDoctors(String query) {
        return doctorSearchRepository.findByFirstnameContainingOrLastnameContainingOrSpecialtyContainingOrLicenseNumberContaining(
                query, query, query, query);
    }

    @Transactional(readOnly = true)
    public void syncAll() {
        log.info("Starting synchronization of all patients and doctors to Elasticsearch...");
        
        List<Patient> patients = patientRepository.findAll();
        List<PatientIndex> patientIndices = patients.stream()
                .map(this::mapToPatientIndex)
                .collect(Collectors.toList());
        patientSearchRepository.saveAll(patientIndices);
        log.info("Synced {} patients.", patientIndices.size());

        List<Doctor> doctors = doctorRepository.findAll();
        List<DoctorIndex> doctorIndices = doctors.stream()
                .map(this::mapToDoctorIndex)
                .collect(Collectors.toList());
        doctorSearchRepository.saveAll(doctorIndices);
        log.info("Synced {} doctors.", doctorIndices.size());
    }

    public void syncPatient(Patient patient) {
        patientSearchRepository.save(mapToPatientIndex(patient));
    }

    public void syncDoctor(Doctor doctor) {
        doctorSearchRepository.save(mapToDoctorIndex(doctor));
    }

    public void deletePatientIndex(Long id) {
        patientSearchRepository.deleteById(id.toString());
    }

    public void deleteDoctorIndex(Long id) {
        doctorSearchRepository.deleteById(id.toString());
    }

    private PatientIndex mapToPatientIndex(Patient patient) {
        return PatientIndex.builder()
                .id(patient.getId().toString())
                .firstname(patient.getFirstname())
                .lastname(patient.getLastname())
                .email(patient.getEmail())
                .phone(patient.getPhone())
                .address(patient.getAddress())
                .insurancePolicyNumber(patient.getInsurancePolicyNumber())
                .nationality(patient.getNationality())
                .build();
    }

    private DoctorIndex mapToDoctorIndex(Doctor doctor) {
        return DoctorIndex.builder()
                .id(doctor.getId().toString())
                .firstname(doctor.getFirstname())
                .lastname(doctor.getLastname())
                .email(doctor.getEmail())
                .phone(doctor.getPhone())
                .specialty(doctor.getSpecialty())
                .licenseNumber(doctor.getLicenseNumber())
                .education(doctor.getEducation())
                .build();
    }
}
