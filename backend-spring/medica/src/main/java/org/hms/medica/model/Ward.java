package org.hms.medica.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Ward {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  private String phoneNumber;
  private String email;
  private int numOfBeds;
  private int numOfNurses;
  private boolean isMale;
  private boolean isFemale;
  private boolean isLock;
  private boolean isActive;
  // I am not sure what does this mean
  private float duration;

  @OneToMany(mappedBy = "ward", fetch = FetchType.LAZY)
  private Set<Patient> patients = new HashSet<>();

  @OneToMany(mappedBy = "ward", fetch = FetchType.LAZY)
  private Set<Doctor> doctors = new HashSet<>();
}
