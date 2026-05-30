package com.ron.backend.service;

import com.ron.backend.dto.AnalysisResponseDto;
import com.ron.backend.entity.Analysis;
import com.ron.backend.entity.UserData;
import com.ron.backend.entity.UserHistory;
import com.ron.backend.entity.Users;
import com.ron.backend.exception.LimitExceedException;
import com.ron.backend.exception.UnSupportedMediaException;
import com.ron.backend.repository.*;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class analyzeService {

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private UserDataRepository userDataRepo;

    @Autowired
    private HistoryRepository historyRepo;

    @Autowired
    private AnalysisRepository analysisRepo;

    public String analyzeFile(MultipartFile file) throws UnSupportedMediaException, IOException {
            String dbResponse = getAnalysis(file.getOriginalFilename());
            if(dbResponse != null) {
                return dbResponse;
            }

            String content = extractTextFromFile(file);
            String aiResponse = geminiService.analyzeResume(content); //fetch analysis via ai..

            savedAnalysisData(file, aiResponse); //saved resume to DB.
            return aiResponse;
    }

    //saved data of analysis
    public void savedAnalysisData(MultipartFile file, String aiResponse) {
        try {
            Users user = userRepo.findByUsername(getCurrentUser());
            int ats = extractAtsFromAiResponse(aiResponse);

            Analysis analysis = new Analysis();
            analysis.setFilename(file.getOriginalFilename());
            analysis.setContent(aiResponse);
            analysis.setDate(LocalDateTime.now());
            analysis.setAts(ats);
            analysis.setUser(user);

            updateUserDataTable(); //update user info table.
            updateUserHistoryTable(analysis); //add analysis to history.
            analysisRepo.save(analysis); //save analysis to DB.
        } catch(RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private String extractTextFromFile(MultipartFile file) throws IOException {
        String type = file.getContentType();

        if (type == null || type.isBlank()) {
            throw new UnSupportedMediaException(
                    "File type is missing"
            );
        }

        return switch (type) {

            // TXT
            case "text/plain" ->
                    new String(file.getBytes());

            // PDF
            case "application/pdf" -> {

                try (PDDocument document =
                             PDDocument.load(file.getInputStream())) {

                    PDFTextStripper stripper =
                            new PDFTextStripper();

                    yield stripper.getText(document);
                }
            }

            // DOCX
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document" -> {

                try (XWPFDocument document =
                             new XWPFDocument(file.getInputStream());

                     XWPFWordExtractor extractor =
                             new XWPFWordExtractor(document)) {

                    yield extractor.getText();
                }
            }

            default ->
                    throw new UnSupportedMediaException(
                            "Unsupported file type: " + type
                    );
        };
    }

    private int extractAtsFromAiResponse(String aiResponse) {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(aiResponse).get("ats_score");
        return root != null ? root.asInt() : 0;
    }

    public String getAnalysis(String filename) {
        Users user = userRepo.findByUsername(getCurrentUser());
        Long userId = user.getId();

        if(checkValidity()) { //for checking today's limits
            throw new LimitExceedException("limit exceeded!");
        }

        Analysis analysis = analysisRepo.findByFilenameAndUserId(filename, userId);
        if(analysis != null){
            updateUserDataTable();
            updateUserHistoryTable(analysis);
            return analysis.getContent();
        } else {
            return null;
        }
    }

    public String getCurrentUser() {
        Authentication auth = SecurityContextHolder
                .getContext()
                .getAuthentication();

        if(auth == null) {
            throw new RuntimeException("login failed!");
        }

        return auth.getName();
    }

    public long getLimitByPlan(String plan) {
        return switch(plan) {
            case "PRO" -> 200;
            case "PRO_PLUS" -> 1000;
            default -> 5;
        };
    }

    public void resetDailyLimit(UserData userData) {
        if(userData != null && !userData.getLastResetDate().equals(LocalDate.now())) {
            userData.setRemainingLimit(
                    getLimitByPlan(userData.getPlan())
            );
            userData.setLastResetDate(LocalDate.now());
        }
    }

    public boolean checkValidity() {
        Users user = userRepo.findByUsername(getCurrentUser());
        UserData userData = userDataRepo.findByUserId(user.getId());
        resetDailyLimit(userData);

        if(userData != null) {
            return userData.getRemainingLimit() <= 0;
        }

        throw new RuntimeException("user_data is null");
    }

    public void updateUserDataTable() {
        Users user = userRepo.findByUsername(getCurrentUser());
        UserData userData = userDataRepo.findByUserId(user.getId());
        Long userId = userRepo.findByUsername(getCurrentUser()).getId();

        if(userData.getRemainingLimit() > 0) {
            userData.setAvgAtsScore(analysisRepo.getAverageAtsScore(userId)); //avg_ats_score
            userData.setRemainingLimit(userData.getRemainingLimit() - 1); //limit--
            userData.setTotalAnalysis(userData.getTotalAnalysis() + 1); //analysis++
            userDataRepo.save(userData);
        }
    }

    public void updateUserHistoryTable(Analysis analysis) {
        Users user = userRepo.findByUsername(getCurrentUser());
        UserHistory uHistory = new UserHistory();

        uHistory.setFileName(analysis.getFilename());
        uHistory.setDate(LocalDate.now());
        uHistory.setAts(analysis.getAts());
        uHistory.setUser(user);

        historyRepo.save(uHistory);
    }

    public AnalysisResponseDto viewRecentAnalysis(String filename) {
        try {
            Users user = userRepo.findByUsername(getCurrentUser());
            Analysis analysis = analysisRepo.findByFilenameAndUserId(filename, user.getId());

            if(analysis != null){
                AnalysisResponseDto dto = new AnalysisResponseDto();
                dto.setContent(analysis.getContent());
                dto.setFilename(analysis.getFilename());
                dto.setDate(analysis.getDate());
                return dto;
            } else {
                return null;
            }
        } catch(Exception e) {
            throw new RuntimeException("something went wrong" + e.getMessage());
        }
    }

    public String removeHistoryAnalysis(String filename) {
        try {
            Users user = userRepo.findByUsername(getCurrentUser());
            historyRepo.deleteByUser_IdAndFileName( //remove it.
                    user.getId(),
                    filename
            );

            UserHistory uHistory = historyRepo.findByUser_IdAndFileName( //check it is still exist.
                    user.getId(), filename
            );

            if(uHistory == null){
                return "recent analysis deleted successfully!";
            }
        } catch(Exception e) {
            throw new RuntimeException("something went wrong" + e.getMessage());
        }

        return "failed to removed analysis!";
    }
}
