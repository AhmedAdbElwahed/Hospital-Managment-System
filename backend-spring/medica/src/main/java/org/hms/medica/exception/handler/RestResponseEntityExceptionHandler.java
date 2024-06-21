package org.hms.medica.exception.handler;

import io.jsonwebtoken.ExpiredJwtException;
import org.hms.medica.exception.errorDto.RestErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.naming.AuthenticationException;
import java.time.LocalDateTime;

@RestControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {AccessDeniedException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public RestErrorMessage handleAccessDeniedException(
            Exception ex, WebRequest request) {
        return RestErrorMessage.builder()
                .timestamp(LocalDateTime.now().toString())
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .error(HttpStatus.BAD_REQUEST.toString())
                .message(ex.getMessage())
                .path(request.getContextPath())
                .build();
    }

    @ExceptionHandler(value
            = {RuntimeException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public RestErrorMessage handleConflict(
            RuntimeException ex, WebRequest request) {
        return RestErrorMessage.builder()
                .timestamp(LocalDateTime.now().toString())
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .error(HttpStatus.BAD_REQUEST.toString())
                .message(ex.getMessage())
                .path(request.getContextPath())
                .build();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public RestErrorMessage handleGenericException(final Exception ex, final WebRequest request) {
        System.out.println("handleGenericException ....");
        return RestErrorMessage.builder()
                .timestamp(LocalDateTime.now().toString())
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .error(HttpStatus.BAD_REQUEST.toString())
                .message(ex.getMessage())
                .path(request.getContextPath())
                .build();
    }

    @ExceptionHandler(ExpiredJwtException.class)
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public RestErrorMessage handleExpiredJwtException(final ExpiredJwtException ex, final WebRequest request) {
        System.out.println("handleExpiredJwtException ....");
        return RestErrorMessage.builder()
                .timestamp(LocalDateTime.now().toString())
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .error(HttpStatus.BAD_REQUEST.toString())
                .message(ex.getMessage())
                .path(request.getContextPath())
                .build();
    }

    @ExceptionHandler({AuthenticationException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public RestErrorMessage handleAuthenticationException(Exception ex, WebRequest request) {
        return RestErrorMessage.builder()
                .timestamp(LocalDateTime.now().toString())
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .error(HttpStatus.BAD_REQUEST.toString())
                .message(ex.getMessage())
                .path(request.getContextPath())
                .build();
    }

    @ExceptionHandler(value = {IllegalArgumentException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public RestErrorMessage handleIllegalArgumentException(
            IllegalArgumentException ex, WebRequest request) {
        return RestErrorMessage.builder()
                .timestamp(LocalDateTime.now().toString())
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .error(HttpStatus.BAD_REQUEST.toString())
                .message(ex.getMessage())
                .path(request.getContextPath())
                .build();
    }
}
