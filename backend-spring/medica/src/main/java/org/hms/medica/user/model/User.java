package org.hms.medica.user.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hms.medica.auth.model.Role;
import org.hms.medica.constants.Gender;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;


@Getter
@Setter
@SuperBuilder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "`user`")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Firstname cannot be Empty")
    @NotNull(message = "Firstname cannot be Null")
    private String firstname;

    @NotEmpty(message = "Lastname cannot be Empty")
    @NotNull(message = "Lastname cannot be Null")
    private String lastname;

    private Gender gender;


    @Column(name = "date_of_birth")
    private LocalDate dob;

//    @NotEmpty(message = "Address cannot be Empty")
//    @NotNull(message = "Address cannot be Null")
    @Column(nullable = true)
    private String address;

//    @NotEmpty(message = "Phone cannot be Empty")
//    @NotNull(message = "Phone cannot be Null")
    private String phone;

    @NotEmpty(message = "Email cannot be Empty")
    @NotNull(message = "Email cannot be Null")
    @Column(nullable = false, unique = true)
    private String email;

    @NotEmpty(message = "Password cannot be Empty")
    @NotNull(message = "Password cannot be Null")
    private String password;

    @Column(columnDefinition = "timestamp default current_timestamp")
    private LocalDateTime create_at;

    @Column(columnDefinition = "boolean default false")
    private Boolean is_enabled;

    @ManyToMany
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
}
