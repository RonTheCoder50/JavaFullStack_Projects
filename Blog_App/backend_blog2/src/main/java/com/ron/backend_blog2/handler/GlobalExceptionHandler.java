package com.ron.backend_blog2.handler;

import com.ron.backend_blog2.exceptions.UnAuthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UnAuthorizedException.class)
    public ResponseEntity<?> unAuthorizedExceptionHandler(UnAuthorizedException e) {
        Map<String,Object> map = new HashMap<>();
        map.put("success",false);
        map.put("status", 401);
        map.put("message", e.getMessage());

        return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
    }
}
