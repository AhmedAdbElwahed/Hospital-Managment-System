package org.hms.medica.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hms.medica.auth.model.Role;
import org.hms.medica.baseEntity.AuditedEntity;
import org.hms.medica.constants.Gender;

import java.time.LocalDate;
import java.util.Collection;

@Getter
@Setter
@Entity
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "`user`")
@Inheritance(strategy = InheritanceType.JOINED)
public class User extends AuditedEntity {

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

    @JsonIgnoreProperties("roles")
    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Collection<Role> roles;
}
