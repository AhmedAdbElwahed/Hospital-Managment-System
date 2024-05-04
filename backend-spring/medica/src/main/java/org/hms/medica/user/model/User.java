package org.hms.medica.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import lombok.*;
import org.hms.medica.auth.model.Role;
import org.hms.medica.constants.Gender;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "`user`")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @NotEmpty(message = "Lastname cannot be Empty")
  @NotNull(message = "Lastname cannot be Null")
  private String firstname;

  @NotEmpty(message = "Lastname cannot be Empty")
  @NotNull(message = "Lastname cannot be Null")
  private String lastname;

  private Gender gender;

  @Column(name = "date_of_birth")
  private LocalDate dob;

  @Column(nullable = true)
  private String address;

  private String phone;

  @NotEmpty(message = "Email cannot be Empty")
  @NotNull(message = "Email cannot be Null")
  @Column(nullable = false, unique = true)
  private String email;

  @NotEmpty(message = "Password cannot be Empty")
  @NotNull(message = "Password cannot be Null")
  private String password;

  @Column(columnDefinition = "boolean default false")
  private Boolean is_enabled;

  @Column(columnDefinition = "timestamp default current_timestamp")
  private LocalDateTime create_at;

  @JsonIgnoreProperties("roles")
  @JsonIgnore
  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
      name = "users_roles",
      joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
  private Collection<Role> roles;
}
