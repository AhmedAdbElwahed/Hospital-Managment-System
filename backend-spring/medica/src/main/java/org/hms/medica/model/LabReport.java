package org.hms.medica.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LabReport extends BaseEntity {
  private String name;
  private String comments;
  private LocalDate date;
  @OneToMany private Set<LabTest> tests = new HashSet<>();
}
