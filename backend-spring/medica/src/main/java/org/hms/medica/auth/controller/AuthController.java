package org.hms.medica.auth.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hms.medica.auth.dto.AuthenticationRequest;
import org.hms.medica.auth.dto.AuthenticationResponse;
import org.hms.medica.auth.dto.RegisterRequest;
import org.hms.medica.auth.service.AuthService;
import org.hms.medica.otp.OTP;
import org.hms.medica.otp.otpRepository;
import org.hms.medica.user.model.User;
import org.hms.medica.user.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/hms/v1/auth")
@Slf4j
public class AuthController {

    private AuthService authService;

    private otpRepository otpRepository;

    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest authenticationRequest) {
        log.info("authenticationRequest: {}", authenticationRequest);
        return ResponseEntity.status(HttpStatus.OK).body(authService.login(authenticationRequest));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        authService.refreshToken(request, response);
    }

    // @GetMapping("/verify/{otp}")
    // public void otp(@RequestParam(name = "otp") String otp) {

    // }

    @GetMapping("/verify/{otp}")
    public String verifyOTP(@RequestParam(name = "otp") String otp) {
        // Retrieve OTP from the database
        Optional<OTP> otpEntityOptional = otpRepository.findByOtp(otp);

        if (otpEntityOptional.isPresent()) {
            OTP otpEntity = otpEntityOptional.get();

            // Check if OTP is expired
            LocalDateTime expirationTime = otpEntity.getCreatedAt().plusMinutes(10); // Assuming OTP expires after 10
                                                                                     // minutes
            LocalDateTime currentTime = LocalDateTime.now();
            if (currentTime.isAfter(expirationTime)) {
                // OTP is expired, handle the error
                return "Expired OTP. Please request a new OTP.";
            } else {
                // OTP is valid, mark user account as verified
                User user = userRepository.findUserByEmail(otpEntity.getEmail())
                        .orElseThrow(() -> new RuntimeException("User not found")); // Handle user not found

                user.setIs_enabled(true); // Mark user account as verified
                userRepository.save(user); // Save the updated user

                // Delete the OTP from the database (optional, depending on your requirements)
                otpRepository.delete(otpEntity);

                // You can redirect the user to a success page or return a success message
                return "Your account has been successfully verified!";
            }
        } else {
            // OTP not found, handle the error (e.g., redirect to an error page or return an
            // error message)
            return "Invalid OTP. Please try again.";
        }
    }

}