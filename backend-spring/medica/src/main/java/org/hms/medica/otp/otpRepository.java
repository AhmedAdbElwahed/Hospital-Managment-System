package org.hms.medica.otp;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface otpRepository extends JpaRepository<OTP, Long> {
    Optional<OTP> findByOtp(String otp);
}
