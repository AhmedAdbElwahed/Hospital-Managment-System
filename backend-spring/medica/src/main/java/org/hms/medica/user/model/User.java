package org.hms.medica.user.model;

<<<<<<< HEAD
=======

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
>>>>>>> 1e9b987a90de025dbc56f7ea5b4b488d3e2e9ca1
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
<<<<<<< HEAD
public class User extends AuditedEntity {

  @NotEmpty(message = "Firstname cannot be Empty")
  @NotNull(message = "Firstname cannot be Null")
  private String firstname;
=======
@Inheritance(strategy = InheritanceType.JOINED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
>>>>>>> 1e9b987a90de025dbc56f7ea5b4b488d3e2e9ca1

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

<<<<<<< HEAD
  @ManyToMany
  @JoinTable(
      name = "users_roles",
      joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
  private Collection<Role> roles;
=======
    @NotEmpty(message = "Password cannot be Empty")
    @NotNull(message = "Password cannot be Null")
    private String password;

    @Column(columnDefinition = "timestamp default current_timestamp")
    private LocalDateTime create_at;

    @Column(columnDefinition = "boolean default false")
    private Boolean is_enabled;

    @JsonIgnoreProperties("roles")
    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"
            )
    )
    private Collection<Role> roles;
>>>>>>> 1e9b987a90de025dbc56f7ea5b4b488d3e2e9ca1
}
