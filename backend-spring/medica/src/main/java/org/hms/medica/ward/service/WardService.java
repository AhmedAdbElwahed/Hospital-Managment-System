package org.hms.medica.ward.service;

import lombok.RequiredArgsConstructor;
import org.hms.medica.admission.model.Admission;
import org.hms.medica.ward.exception.WardNotFoundException;
import org.hms.medica.ward.model.Ward;
import org.hms.medica.ward.repository.WardRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WardService {
    private final WardRepository wardRepository;

    public Ward admitToWard(Admission admission, String wardName) {
        Ward ward = findWardByName(wardName);
        ward.addPatient(admission.getPatient());

        return wardRepository.save(ward);
    }

    public Ward findWardByName(String wardName) {
        return wardRepository.findByName(wardName)
                .orElseThrow(() -> new WardNotFoundException(wardName));
    }
}
