package org.hms.medica.examination.model;

import lombok.*;

import java.time.LocalDateTime;

import org.hms.medica.admission.model.Admission;
import org.hms.medica.patient.model.Patient;

import jakarta.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Examination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private double oxygen_saturation;
    private double urine_output;
    private String bowel_movement;
    private String auscultation;
    private double heart_rate;
    private double weight;
    private double temperature;
    private LocalDateTime date;
    private double height;
    @ManyToOne
    @JoinColumn(name = "admission_id")
    private Admission admission;
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

}
// ex_id: Examination ID
// ex_sat: Oxygen saturation
// ex_diuresis: Urine output
// ex_bowel: Bowel movement
// ex_auscultation: Results of listening to a patient's internal sounds with a
// stethoscope
// ex_hr: Heart rate
// ex_weight: Weight
// ex_temp: Temperature
// ex_date: Examination date
// ex_height: Height
// Admission_ID: Admission ID number
// patient_id: Patient ID number