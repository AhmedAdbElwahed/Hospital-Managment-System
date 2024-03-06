package org.hms.medica.constants;

public enum Gender {
    MALE(0), FEMALE(1);

    private final int gender;
    Gender(int gender) {
        this.gender = gender;
    }

    public int getGender() {
        return gender;
    }
}
