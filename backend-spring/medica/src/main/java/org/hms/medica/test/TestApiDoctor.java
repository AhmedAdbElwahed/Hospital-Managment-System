package org.hms.medica.test;


import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("hms/v1/test/doctor")
@PreAuthorize("hasRole('DOCTOR')")
public class TestApiDoctor {

    @GetMapping
    @PreAuthorize("hasAuthority('READ')")
    public String get() {
        return "GET:: doctor controller";
    }

    @PostMapping
    @PreAuthorize("hasAuthority('WRITE')")
    public String post() {
        return "POST:: doctor controller";
    }

    @PutMapping
    @PreAuthorize("hasAuthority('UPDATE')")
    public String update() {
        return "PUT:: doctor controller";
    }

    @DeleteMapping
    @PreAuthorize("hasAuthority('DELETE')")
    public String delete() {
        return "DELETE:: doctor controller";
    }
}
