package org.hms.medica.user.service;

import lombok.RequiredArgsConstructor;
import org.hms.medica.user.model.User;
import org.hms.medica.user.repo.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;

  public User findUserById(Long userId) {
    return userRepository
        .findById(userId)
        .orElseThrow(
            () -> new UsernameNotFoundException(String.format("Invalid user with id %s", userId)));
  }

  public User findUserByEmail(String email) {
    return userRepository
        .findUserByEmail(email)
        .orElseThrow(
            () ->
                new UsernameNotFoundException(String.format("Invalid user with email %s", email)));
  }
}
