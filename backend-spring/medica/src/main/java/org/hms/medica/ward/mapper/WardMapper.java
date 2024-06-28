package org.hms.medica.ward.mapper;


import org.hms.medica.ward.dto.WardRequestDto;
import org.hms.medica.ward.dto.WardResponseDto;
import org.hms.medica.ward.model.Ward;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface WardMapper {

    @Mapping(target = "isMale", source = "male")
    @Mapping(target = "isLock", source = "lock")
    @Mapping(target = "isFemale", source = "female")
    @Mapping(target = "numberOfPatients", expression = "java(ward.getPatients().size())")
    @Mapping(target = "isActive", source = "active")
    WardResponseDto mapWardToWardResponseDto(Ward ward);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "patients", ignore = true)
    @Mapping(target = "doctors", ignore = true)
    Ward mapWardRequestDtoTWard(WardRequestDto wardRequestDto);

}


