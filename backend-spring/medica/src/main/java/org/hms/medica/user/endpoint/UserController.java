package org.hms.medica.user.endpoint;

import lombok.RequiredArgsConstructor;
import org.hms.medica.user.dto.UserResponseDto;
import org.hms.medica.user.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("")
    public UserResponseDto getUserInfo() {
        return userService.getUserInfo();
    }
}
