package com.ron.backend.handler;

import com.ron.backend.exception.UnSupportedMediaException;
import com.ron.backend.exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
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
}
