package org.hms.medica.ward.exception;

public class WardNotFoundException extends RuntimeException {
    public WardNotFoundException(String wardName) {
        super("Ward not found with name: " + wardName);
    }
}
