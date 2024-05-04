package org.hms.medica.doctor.repo;

import java.util.Optional;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

  Optional<User> getDoctorByFirstname(String name);

  Optional<Doctor> getDoctorByEmail(String email);
}
