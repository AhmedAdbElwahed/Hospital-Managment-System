package org.hms.medica.bill.model;

import java.time.LocalDateTime;

import org.hms.medica.patient.model.Patient;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String status;
    private double amount;
    private LocalDateTime bill_date;
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

}
