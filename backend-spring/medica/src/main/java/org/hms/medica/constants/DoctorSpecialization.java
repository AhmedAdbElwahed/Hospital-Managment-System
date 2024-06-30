package org.hms.medica.constants;

public enum DoctorSpecialization {
    GENERAL_PRACTICE("General Practice"),
    PEDIATRICS("Pediatrics"),
    OBSTETRICS_GYNECOLOGY("Obstetrics Gynecology"),
    DERMATOLOGY("Dermatology"),
    CARDIOLOGY("Cardiology"),
    NEUROLOGY("Neurology"),
    ONCOLOGY("Oncology"),
    ORTHOPEDICS("Orthopedics"),
    OPHTHALMOLOGY("Ophthalmology"),
    OTOLARYNGOLOGY("Otolaryngology"),
    PSYCHIATRY("Psychiatry"),
    UROLOGY("Urology");

    private final String name;

    DoctorSpecialization(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

