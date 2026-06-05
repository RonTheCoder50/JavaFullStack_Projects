package com.ron.backend.handler;

import com.ron.backend.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDate;
import java.util.*;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UnSupportedMediaException.class)
    public ResponseEntity<Map<String, Object>> handleMediaException(UnSupportedMediaException ex) {
        Map<String,Object> map = new HashMap<>();
        map.put("status", 415);
        map.put("success", false);
        map.put("message", ex.getMessage());

        return ResponseEntity
                .status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                .body(map);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleUserNotFoundException(UserNotFoundException ex) {
        Map<String,Object> map = new HashMap<>();
        map.put("status", 404);
        map.put("success", false);
        map.put("message", ex.getMessage());

        return ResponseEntity
                .status(404)
                .body(map);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach((error) -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });

        Map<String,Object> res = new HashMap<>();
        res.put("success", false);
        res.put("status", 400);
        res.put("timestamp", LocalDate.now());
        res.put("message", errors);

        return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DuplicateFoundException.class)
    public ResponseEntity<?> handleDuplicateFoundException(DuplicateFoundException ex) {
        Map<String,Object> res = new HashMap<>();
        res.put("success", false);
        res.put("status", 500);
        res.put("timestamp", LocalDate.now());
        res.put("message", ex.getMessage());

        return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AiQuotaExceededException.class)
    public ResponseEntity<String> handleQuota(AiQuotaExceededException ex) {
        return ResponseEntity
                .status(HttpStatus.TOO_MANY_REQUESTS) // 429
                .body(ex.getMessage());
    }

    @ExceptionHandler(AiServiceBusyException.class)
    public ResponseEntity<String> handleBusy(AiServiceBusyException ex) {
        return ResponseEntity
                .status(HttpStatus.SERVICE_UNAVAILABLE) // 503
                .body(ex.getMessage());
    }
}
