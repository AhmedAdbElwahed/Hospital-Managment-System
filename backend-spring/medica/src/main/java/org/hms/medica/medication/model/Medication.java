package org.hms.medica.medication.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hms.medica.baseEntity.AuditedEntity;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Medication extends AuditedEntity {

  private String name;
  private String dosage;
  private LocalDate startDate;
  private LocalDate endDate;
}
