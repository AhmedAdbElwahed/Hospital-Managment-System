package org.hms.medica.constants;

import lombok.Getter;

@Getter
public enum AuscultationFinding {

    // Heart sounds
    NORMAL_HEART_SOUNDS("Normal (Regular, rhythmic S1 and S2)"),
    HEART_MURMUR("Murmur (Abnormal blood flow through heart valves)"),
    HEART_GALLOP("Gallop (Extra heart sounds)"),
    ARRHYTHMIA("Arrhythmia (Irregular heart rhythm)"),

    // Lung sounds
    NORMAL_LUNG_SOUNDS("Normal (Vesicular sounds)"),
    CRACKLES("Crackles (Fluid in lungs)"),
    WHEEZES("Wheezes (Narrowed airways)"),
    RHONCHI("Rhonchi (Airway obstruction)"),
    PLEURAL_RUB("Pleural rub (Inflamed pleura)"),

    // Abdominal sounds
    NORMAL_BOWEL_SOUNDS("Normal (Active bowel sounds)"),
    HYPOACTIVE_BOWEL_SOUNDS("Hypoactive (Reduced/absent bowel sounds)"),
    HYPERACTIVE_BOWEL_SOUNDS("Hyperactive (Increased bowel sounds)"),
    ABDOMINAL_BRUIT("Bruits (Abnormal blood flow in abdominal vessels)");

    private final String description;

    AuscultationFinding(String description) {
        this.description = description;
    }

}
