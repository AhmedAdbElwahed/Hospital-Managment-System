package org.hms.medica.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LabTest extends BaseEntity {
  private String units;
  private String normalValues;
  private String values;
  private String name;
}
