package org.hms.medica.constants;


import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum Gender {
    MALE(0), FEMALE(1);

    @Getter
    private final int gender;

}
