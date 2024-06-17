package org.hms.medica.labreport.model;

import lombok.*;

import jakarta.persistence.*;

import java.time.LocalDateTime;
// import java.util.Date;

import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.patient.model.Patient;

@Entity
@Table(name = "lab_report")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LabReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String report_comments;
    private LocalDateTime report_date;
    private LocalDateTime creared_at;
    private LocalDateTime modified_at;
    private String report_status;
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

}
