package org.hms.medica.auth.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.hms.medica.EmailService.EmailService;
import org.hms.medica.auth.dto.AuthenticationRequest;
import org.hms.medica.auth.dto.AuthenticationResponse;
import org.hms.medica.auth.dto.RegisterRequest;
import org.hms.medica.auth.dto.ResetPassword;
import org.hms.medica.auth.model.Token;
import org.hms.medica.auth.reop.RoleRepository;
import org.hms.medica.auth.reop.TokenRepository;
import org.hms.medica.config.JwtService;
import org.hms.medica.constants.TokenType;
import org.hms.medica.otp.model.OTP;
import org.hms.medica.otp.model.OTPRepository;
import org.hms.medica.otp.service.OTPService;
import org.hms.medica.user.impl.UserDetailsImpl;
import org.hms.medica.user.model.User;
import org.hms.medica.user.repo.UserRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
@Slf4j
public class AuthService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtService jwtService;
    private AuthenticationManager authenticationManager;
    private TokenRepository tokenRepository;
    private RoleRepository roleRepository;
    private OTPService otpService;

    public void register(RegisterRequest registerRequest) {

        // Create user object
        User user = User.builder()
                .firstname(registerRequest.getFirstname())
                .lastname(registerRequest.getLastname())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .email(registerRequest.getEmail())
                .is_enabled(false) // Set user as not enabled until email is verified
                .create_at(LocalDateTime.now())
                .build();

        // Assign role
        var role = roleRepository.getRoleByName(registerRequest.getRole())
                .orElseThrow(() -> new RuntimeException(String.format("Role %s not found", registerRequest.getRole())));
        user.setRoles(Set.of(role));

        // Save user
        userRepository.save(user);

        // Store OTP in database
        OTP otpEntity = otpService.crateOTP(user);

        // Generate and send OTP
        otpService.sendOTPEmail(user.getEmail(), otpEntity.getOtp());
    }

    public void requestPasswordReset(String email) {
        User user = userRepository.findUserByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException(String.format("user with email: %s not found!", email)));
        OTP otpEntity = otpService.crateOTP(user);
        // Send OTP via email
        otpService.sendOTPEmail(user.getEmail(), otpEntity.getOtp());
    }


    // Add this method to AuthService
    public boolean resetPassword(ResetPassword resetPassword) {
        if (otpService.verifyOTP(resetPassword.getOtp())){
            User user = userRepository.findUserByEmail(resetPassword.getEmail()).orElseThrow(() ->
                    new UsernameNotFoundException("User not found!"));

            // Update user's password
            user.setPassword(passwordEncoder.encode(resetPassword.getNewPassword()));
            userRepository.save(user);
            return true;
        }
        return false;
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .token(jwtToken)
                .user(user)
                .expired(false)
                .revoked(false)
                .tokenType(TokenType.ACCESS_TOKEN)
                .build();
        tokenRepository.save(token);
    }



    public boolean activateAccount(String otp) {
        if (otpService.verifyOTP(otp)) {
            User user = otpService.getOTP(otp).getUser();

            user.setIs_enabled(true); // Mark user account as verified
            userRepository.save(user); // Save the updated user

            // Delete the OTP from the database (optional, depending on your requirements)
            otpService.deleteAllUserOPT(user);
            return true;
        }
        return false;
    }



    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach((token) -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public AuthenticationResponse login(AuthenticationRequest authenticationRequest) {
        log.info("login is being called");
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),
                        authenticationRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        log.info("is auth {}", authentication.isAuthenticated());
        var user = userRepository.findUserByEmail(authenticationRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException(String.format("User with email %s not found",
                        authenticationRequest.getEmail())));
        log.info("user: {}", user.getFirstname());
        var jwtToken = jwtService.generateJwtToken(createUserDetails(user));
        var jwtRefreshToken = jwtService.generateJwtRefreshToken(createUserDetails(user));
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(jwtRefreshToken)
                .build();
    }

    private UserDetails createUserDetails(User user) {
        return new UserDetailsImpl(user);
    }

    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String jwtRefreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        jwtRefreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwtRefreshToken);
        if (userEmail != null) {
            var user = this.userRepository.findUserByEmail(userEmail).orElseThrow(
                    () -> new UsernameNotFoundException(String.format("user with this email %s not found", userEmail)));
            // var isTokenValid = tokenRepository.findByToken(jwtRefreshToken)
            // .map((token) -> !token.getExpired() && !token.getRevoked())
            // .orElse(false);
            if (jwtService.validateJwtToken(jwtRefreshToken, createUserDetails(user))) {
                var jwtAccessToken = jwtService.generateJwtToken(createUserDetails(user));
                revokeAllUserTokens(user);
                saveUserToken(user, jwtAccessToken);
                var authResponse = AuthenticationResponse.builder()
                        .accessToken(jwtAccessToken)
                        .refreshToken(jwtRefreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}
