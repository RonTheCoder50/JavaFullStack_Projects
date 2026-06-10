package com.ron.backend.controller;

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

    //for resume analysis
    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file)
            throws UnSupportedMediaException, IOException {
        return ResponseEntity.status(200).body(service.analyzeFile(file));
    }

    //for job matching analysis
    @PostMapping("/job-matching")
    public ResponseEntity<?> getJobMatchingFeedback(
            @RequestParam("file") MultipartFile file,
            @RequestParam String description
    ) throws IOException, UnSupportedMediaException {
        return ResponseEntity.status(200).body(service.getJobMatchingResponse(file, description));
    }

    @GetMapping("/view/{filename}")
    public ResponseEntity<?> viewAnalysis(@PathVariable String filename) {
        return ResponseEntity.status(200).body(service.viewRecentAnalysis(filename));
    }

    @DeleteMapping("/remove/{filename}")
    public ResponseEntity<?> removeAnalysis(@PathVariable String filename) {
        return ResponseEntity.status(200).body(service.removeHistoryAnalysis(filename));
    }
}
