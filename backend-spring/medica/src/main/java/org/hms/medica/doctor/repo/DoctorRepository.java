package org.hms.medica.doctor.repo;

import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    Optional<User> getDoctorByFirstname(String name);
}
