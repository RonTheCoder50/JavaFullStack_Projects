package com.ron.backend.controller;

import com.ron.backend.dto.AnalysisResponseDto;
import com.ron.backend.exception.UnSupportedMediaException;
import com.ron.backend.service.analyzeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/file")
public class analyzeController {
    @Autowired
    private analyzeService service;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) throws UnSupportedMediaException, IOException {
        return ResponseEntity.status(200).body(service.analyzeFile(file));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAnalysis(
            @PathVariable Long id,
            @RequestParam String filename
    ) {
        AnalysisResponseDto dto = service.getAnalysis(id, filename);
        if (dto == null) {
            return ResponseEntity.status(404).body(null);
        }

        return ResponseEntity.status(200).body(dto);
    }
}
