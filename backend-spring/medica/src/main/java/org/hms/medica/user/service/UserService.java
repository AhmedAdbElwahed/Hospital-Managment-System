package org.hms.medica.user.service;

import lombok.RequiredArgsConstructor;
import org.hms.medica.user.dto.UserRequestDto;
import org.hms.medica.user.dto.UserResponseDto;
import org.hms.medica.user.mapper.UserMapper;
import org.hms.medica.user.model.User;
import org.hms.medica.user.repo.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public User getCurrentUser() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository
                .findUserByEmail(userEmail)
                .orElseThrow(
                        () -> new UsernameNotFoundException("User not found with email: " + userEmail));
    }

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

    public UserResponseDto getUserInfo() {

        User curUser = getCurrentUser();
        return userMapper.userMapToDto(curUser);
    }

    @Transactional
    public void updateUser(UserRequestDto userRequestDto) {
        var user = findUserByEmail(userRequestDto.getEmail());
        if (user != null) {
            user.setFirstname(userRequestDto.getFirstname());
            user.setLastname(user.getLastname());
            user.setDob(userRequestDto.getDob());
            user.setAddress(userRequestDto.getAddress());
            user.setGender(userRequestDto.getGender());
            user.setPhone(userRequestDto.getPhone());
            userRepository.save(user);
        }else
            throw new RuntimeException("Can not update user Info");
    }
}
