package org.hms.medica.user.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Collection;
import lombok.*;
import org.hms.medica.auth.model.Role;
import org.hms.medica.baseEntity.AuditedEntity;
import org.hms.medica.constants.Gender;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "`user`")
public class User extends AuditedEntity {

  @NotEmpty(message = "Firstname cannot be Empty")
  @NotNull(message = "Firstname cannot be Null")
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

  @ManyToMany
  @JoinTable(
      name = "users_roles",
      joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
  private Collection<Role> roles;
}
