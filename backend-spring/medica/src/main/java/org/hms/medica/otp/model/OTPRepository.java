package org.hms.medica.otp.model;

import java.util.Optional;

import org.hms.medica.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OTPRepository extends JpaRepository<OTP, Long> {
    Optional<OTP> findByOtp(String otp);

    void deleteAllByUser(User user);
}
