package com.ron.backend.controller;

import com.ron.backend.entity.Analysis;
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

    //saved analysis in DB -> (POST)
    @PostMapping("/saved")
    public ResponseEntity<?> savedAnalysis(Analysis analysis) {
        return ResponseEntity.status(200).body(service.savedAnalysisData(analysis));
    }

    //get all analysis -> same userID total analyze resume data! (GET)

    //clear all analysis -> remove all data (DELETE)
}
