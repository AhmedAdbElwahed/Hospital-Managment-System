package org.hms.medica.user.endpoint;

import lombok.RequiredArgsConstructor;
import org.hms.medica.user.dto.UserRequestDto;
import org.hms.medica.user.dto.UserResponseDto;
import org.hms.medica.user.service.UserService;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping()
    public ResponseEntity<UserResponseDto> getUserInfo() {
        return ResponseEntity.status(HttpStatusCode.valueOf(200)).body(userService.getUserInfo());
    }

    @PutMapping("/update-user")
    public ResponseEntity<String> updateUser(@RequestBody UserRequestDto userRequestDto) {
        userService.updateUser(userRequestDto);
        return ResponseEntity.status(HttpStatusCode.valueOf(200)).body("User Info Updated Successfully");
    }
}
