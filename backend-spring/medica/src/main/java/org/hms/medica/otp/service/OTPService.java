package org.hms.medica.otp.service;

import lombok.AllArgsConstructor;
import org.hms.medica.email.service.EmailService;
import org.hms.medica.otp.model.OTP;
import org.hms.medica.otp.model.OTPRepository;
import org.hms.medica.user.model.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class OTPService {

    private OTPRepository otpRepository;
    private EmailService emailService;

    public String generateOTP() {
        String numbers = "0123456789";
        String upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String combinedChars = numbers + upperCaseLetters;
        SecureRandom secureRandom = new SecureRandom();

        StringBuilder otp = new StringBuilder(6);
        for (int i = 0; i < 6; i++) {
            int index = secureRandom.nextInt(combinedChars.length());
            otp.append(combinedChars.charAt(index));
        }
        return otp.toString();
    }

    @Transactional
    public OTP crateOTP(User user) {
        OTP otpEntity = OTP.builder()
                .otp(generateOTP())
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();
        return otpRepository.save(otpEntity);
    }

    public boolean verifyOTP(String otp) {
        OTP otpEntity = getOTP(otp);

        // Check if OTP is expired
        LocalDateTime expirationTime = otpEntity.getCreatedAt().plusMinutes(10); // Assuming OTP expires after 10
        // minutes
        LocalDateTime currentTime = LocalDateTime.now();

        return !currentTime.isAfter(expirationTime);
    }

    public void sendOTPEmail(String email, String otp) {
        // Construct email message
        String subject = "Verify your email address";
        String message = "Your OTP for email verification is: " + otp;
        emailService.sendEmail(email, subject, message);
    }

    public OTP getOTP(String otp) {
        return otpRepository.findByOtp(otp).orElseThrow(() ->
                new RuntimeException(String.format("OTP %s not found!", otp)));
    }

    @Transactional
    public void deleteAllUserOPT(User user) {
        otpRepository.deleteAllByUser(user);
    }
}
