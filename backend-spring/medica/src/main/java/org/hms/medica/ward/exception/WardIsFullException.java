package org.hms.medica.ward.exception;

import jakarta.validation.constraints.NotNull;
import org.checkerframework.common.aliasing.qual.Unique;

public class WardIsFullException extends RuntimeException {
    public WardIsFullException(@NotNull @Unique String wardName) {
        super(String.format("ward %s is full", wardName));
    }
}
