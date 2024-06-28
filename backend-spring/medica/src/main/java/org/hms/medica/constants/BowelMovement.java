package org.hms.medica.constants;

import lombok.Getter;

@Getter
public enum BowelMovement {

    NORMAL("Normal"),
    CONSTIPATION("Constipation (Hard, infrequent stools)"),
    DIARRHEA("Diarrhea (Loose, frequent stools)"),
    MELENA("Melena (Black, tarry stools)"),
    HEMATOCHEZIA("Hematochezia (Red, bloody stools)"),
    ABSENT("Absent");

    private final String description;

    BowelMovement(String description) {
        this.description = description;
    }

}
