package org.hms.medica.billservice.model;

import org.hms.medica.bill.model.Bill;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BillService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double cost;
    @ManyToOne
    @JoinColumn(name = "bill_id")
    private Bill bill;

}
