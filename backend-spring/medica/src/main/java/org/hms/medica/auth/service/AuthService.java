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
import org.hms.medica.auth.model.Role;
import org.hms.medica.auth.model.Token;
import org.hms.medica.auth.reop.RoleRepository;
import org.hms.medica.auth.reop.TokenRepository;
import org.hms.medica.config.JwtService;
import org.hms.medica.constants.TokenType;
import org.hms.medica.otp.OTP;
import org.hms.medica.otp.otpRepository;
import org.hms.medica.user.impl.UserDetailsImpl;
import org.hms.medica.user.model.User;
import org.hms.medica.user.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
import java.util.Collections;
import java.util.Random;
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
    private EmailService emailService;
    private otpRepository otpRepository;

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        // Generate OTP
        String otp = generateOTP();

        // Store OTP in database
        OTP otpEntity = new OTP();
        otpEntity.setEmail(registerRequest.getEmail());
        otpEntity.setOtp(otp);
        otpEntity.setCreatedAt(LocalDateTime.now()); // Set current timestamp
        otpRepository.save(otpEntity);

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

        // Generate JWT Tokens
        var jwtToken = jwtService.generateJwtToken(createUserDetails(user));
        var jwtRefreshToken = jwtService.generateJwtRefreshToken(createUserDetails(user));

        // Revoke previous tokens
        revokeAllUserTokens(user);

        // Save user token
        saveUserToken(user, jwtToken);

        // Generate and send OTP
        sendOTPEmail(user.getEmail(), otp);

        // Return AuthenticationResponse
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(jwtRefreshToken)
                .build();
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

    private void sendOTPEmail(String email, String otp) {
        // Construct email message
        String subject = "Verify your email address";
        String message = "Your OTP for email verification is: " + otp;
        emailService.sendEmail(email, subject, message);
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
