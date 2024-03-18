package org.hms.medica.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hms.medica.constants.Gender;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Doctor extends User {

  private String phoneNumber;
  private String education;
  private String certifications;
  private String experience;
  private boolean activeStatus;
  private String specialty;
  private String licenseNumber;

  @OneToMany(mappedBy = "doctor", fetch = FetchType.LAZY)
  private Set<Appointment> appointment = new HashSet<>();

  @ManyToOne
  @JoinColumn(name = "ward_id")
  private Ward ward;
}
