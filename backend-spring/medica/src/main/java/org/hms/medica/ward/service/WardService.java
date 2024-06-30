package org.hms.medica.ward.service;

import lombok.RequiredArgsConstructor;
import org.hms.medica.admission.model.Admission;
import org.hms.medica.ward.dto.WardRequestDto;
import org.hms.medica.ward.dto.WardResponseDto;
import org.hms.medica.ward.exception.WardNotFoundException;
import org.hms.medica.ward.mapper.WardMapper;
import org.hms.medica.ward.model.Ward;
import org.hms.medica.ward.repository.WardRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WardService {
    private final WardRepository wardRepository;
    private final WardMapper wardMapper;

    public Ward admitToWard(Admission admission, String wardName) {
        Ward ward = findWardByName(wardName);
        if (!isWardFull(ward)) {
            ward.getPatients().add(admission.getPatient());
            return wardRepository.save(ward);
        }else
            throw new RuntimeException("Can not admit patient to ward");
    }

    public List<WardResponseDto> getAllWards() {
        return wardRepository.findAll()
                .stream()
                .map(wardMapper::mapWardToWardResponseDto)
                .toList();
    }

    public void addWard(WardRequestDto requestDto) {
        var ward = wardMapper.mapWardRequestDtoTWard(requestDto);
        ward.setPatients(Collections.emptySet());
        ward.setDoctors(Collections.emptySet());
        wardRepository.save(ward);
    }

    public WardResponseDto getWardDto(Long wardId) {
        return wardMapper.mapWardToWardResponseDto(findWardById(wardId));
    }

    public Boolean isWardFull(Ward ward) {
        return ward.getPatients().size() > ward.getNumOfBeds();
    }

    public Ward findWardById(Long wardId) {
        return wardRepository.findById(wardId).orElseThrow(() ->
                new RuntimeException("Can't find ward with id: " + wardId));
    }

    public Ward findWardByName(String wardName) {
        return wardRepository.findByName(wardName)
                .orElseThrow(() -> new WardNotFoundException(wardName));
    }

    public void updateWard(Long wardId, WardRequestDto requestDto) {
        var ward = findWardById(wardId);
        ward.setName(requestDto.getName());
        ward.setEmail(requestDto.getEmail());
        ward.setNumOfBeds(requestDto.getNumOfBeds());
        ward.setNumOfNurses(requestDto.getNumOfNurses());
        ward.setFemale(requestDto.getIsFemale());
        ward.setMale(requestDto.getIsMale());
        ward.setLock(requestDto.getIsLock());
        ward.setActive(requestDto.getIsActive());
        ward.setPhoneNumber(requestDto.getPhoneNumber());
        wardRepository.save(ward);
    }

    public void deleteWardById(Long id) {
        wardRepository.deleteById(id);
    }
}
