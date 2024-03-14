package org.hms.medica.test;


import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("hms/v1/test/admin")
@PreAuthorize("hasRole('ADMIN')")
public class TestApi {

    @GetMapping
    @PreAuthorize("hasAuthority('READ')")
    public String get() {
        return "GET:: admin controller";
    }

    @PostMapping
    @PreAuthorize("hasAuthority('WRITE')")
    public String post() {
        return "POST:: admin controller";
    }

    @PutMapping
    @PreAuthorize("hasAuthority('UPDATE')")
    public String update() {
        return "PUT:: admin controller";
    }

    @DeleteMapping
    @PreAuthorize("hasAuthority('DELETE')")
    public String delete() {
        return "DELETE:: admin controller";
    }


}
