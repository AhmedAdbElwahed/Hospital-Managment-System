package org.hms.medica.user.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserDetailServiceImplTest {


    @Autowired
    private UserDetailServiceImpl userDetailService;

    @Test
    void loadUserByUsername() {
        var user = userDetailService.loadUserByUsername("mostafa@gmail.com").getAuthorities();
        System.out.println(user);
        assertTrue(user.isEmpty());
    }
}