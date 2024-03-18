package org.hms.medica.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Bill extends BaseEntity {

    private boolean isPaid;
    private float total_amount;
    private LocalDateTime date;
    @OneToMany
    private Set<BillService> billServices = new HashSet<>();
}
