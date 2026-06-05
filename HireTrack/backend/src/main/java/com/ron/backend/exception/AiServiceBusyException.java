package com.ron.backend.exception;

public class AiServiceBusyException extends RuntimeException {
    public AiServiceBusyException(String message) {
        super(message);
    }
}
