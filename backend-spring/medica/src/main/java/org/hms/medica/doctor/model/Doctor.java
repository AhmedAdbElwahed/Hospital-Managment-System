package org.hms.medica.doctor.model;

import jakarta.persistence.*;
import lombok.*;
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
public class Doctor extends User{

<<<<<<< HEAD
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
=======
>>>>>>> 1e9b987a90de025dbc56f7ea5b4b488d3e2e9ca1

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

<<<<<<< HEAD
  @OneToOne
  @JoinColumn(name = "user_id")
  private User user;
}
=======
//    @OneToOne
//    @JoinColumn(name = "user_id")
//    private User user;
}
>>>>>>> 1e9b987a90de025dbc56f7ea5b4b488d3e2e9ca1
