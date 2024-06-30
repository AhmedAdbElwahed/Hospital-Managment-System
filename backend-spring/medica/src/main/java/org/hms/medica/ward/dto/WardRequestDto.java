package org.hms.medica.ward.dto;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class WardRequestDto {
    private String name;
    private String phoneNumber;
    private String email;
    private Integer numOfBeds;
    private Integer numOfNurses;
    private Boolean isMale;
    private Boolean isFemale;
    private Boolean isLock;
    private Boolean isActive;
}
