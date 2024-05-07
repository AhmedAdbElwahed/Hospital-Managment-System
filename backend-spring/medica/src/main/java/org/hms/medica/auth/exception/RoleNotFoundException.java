package org.hms.medica.auth.exception;

public class RoleNotFoundException extends RuntimeException {
    public RoleNotFoundException(String roleName) {
        super("Invalid role with name: " + roleName);
    }
}
