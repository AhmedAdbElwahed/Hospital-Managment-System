package org.hms.medica.auth.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hms.medica.auth.dto.AuthenticationRequest;
import org.hms.medica.auth.dto.AuthenticationResponse;
import org.hms.medica.auth.dto.RegisterRequest;
import org.hms.medica.auth.dto.ResetPassword;
import org.hms.medica.auth.service.AuthService;
import org.hms.medica.otp.service.OTPService;
import org.hms.medica.user.dto.UserRequestDto;
import org.hms.medica.user.dto.UserResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@AllArgsConstructor
@RequestMapping("/hms/v1/auth")
@Slf4j
public class AuthController {

    private AuthService authService;
    private OTPService otpService;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterRequest registerRequest) {
        authService.register(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
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

    @GetMapping("/activate/{otp}")
    public ResponseEntity<String> activateAccount(@PathVariable(name = "otp") String otp) {
       boolean isActivated =  authService.activateAccount(otp);
        return ResponseEntity.status(isActivated ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
                .body(isActivated ? "Account Activated Successfully": "Invalid Otp");
    }

    @GetMapping("/verify-otp/{otp}")
    public ResponseEntity<String> verifyOtp(@PathVariable(name = "otp") String otp) {
        boolean isValid = otpService.verifyOTP(otp);
        return ResponseEntity.status(isValid ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
                .body(isValid ? "Valid Otp": "Invalid Otp");
    }

    @PostMapping("/password/reset/request")
    public ResponseEntity<String> requestPasswordReset(@RequestParam(name = "email") String email) {
        authService.requestPasswordReset(email);
        return ResponseEntity.ok("Password reset email sent successfully");
    }

    @PostMapping("/password/reset/verify")
    public ResponseEntity<String> verifyPasswordReset(@RequestBody ResetPassword resetPassword) {
        boolean isReset = authService.resetPassword(resetPassword);
        return ResponseEntity.status(isReset ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
                .body(isReset ? "Password Reset Successfully": "Invalid Otp");
    }

    @PatchMapping("/update")
    public ResponseEntity<UserResponseDto> updateUser(@RequestBody UserRequestDto userDto) {
        log.info(userDto.toString());
        return ResponseEntity.status(HttpStatus.OK).body(authService.updateUser(userDto));
    }

}