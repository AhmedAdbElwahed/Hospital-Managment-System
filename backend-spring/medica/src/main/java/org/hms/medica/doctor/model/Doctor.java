package org.hms.medica.doctor.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hms.medica.appointment.model.Appointment;
import org.hms.medica.user.model.User;
import org.hms.medica.ward.model.Ward;

import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String education;
  private String certifications;
  private String experience;
  private boolean activeStatus;
  private String specialty;
  private String licenseNumber;
  private LocalTime workStartTime;
  private LocalTime workEndTime;

  @OneToMany(mappedBy = "doctor", fetch = FetchType.LAZY)
  private Set<Appointment> appointment = new HashSet<>();

  @ManyToOne
  @JoinColumn(name = "ward_id")
  private Ward ward;

  @OneToOne
  @JoinColumn(name = "user_id")
  private User user;
}
