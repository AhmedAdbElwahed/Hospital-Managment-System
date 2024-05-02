package org.hms.medica.labtest.model;

import org.hms.medica.labreport.model.LabReport;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lab_test")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class LabTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double test_values;
    private double normal_values;

    @ManyToOne
    @JoinColumn(name = "labreport_id")
    private LabReport labReport;

}
