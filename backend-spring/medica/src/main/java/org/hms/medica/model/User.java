package org.hms.medica.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hms.medica.constants.Gender;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.Collection;

@Getter
@Setter
@Entity
@Table(name = "`User`")
public class User extends BaseEntity implements UserDetails {

  @Id private Long id;

  private String firstName;

  private String lastName;

  private Gender gender;

  @Column(name = "date_of_birth")
  private Instant dob;

  private String address;

  private String phoneNumber;

  private String email;

  private String password;

  private String imageUrl;

  private Instant createdAt;

  private Boolean isEnabled;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return null;
  }

  @Override
  public String getPassword() {
    return null;
  }

  @Override
  public String getUsername() {
    return null;
  }

  @Override
  public boolean isAccountNonExpired() {
    return false;
  }

  @Override
  public boolean isAccountNonLocked() {
    return false;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return false;
  }

  @Override
  public boolean isEnabled() {
    return false;
  }
}
