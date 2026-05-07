package com.ron.backend.service;

import com.ron.backend.entity.Analysis;
import com.ron.backend.exception.UnSupportedMediaException;
import com.ron.backend.repository.FileRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
public class analyzeService {

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private FileRepository fileRepo;

    public String analyzeFile(MultipartFile file) throws UnSupportedMediaException, IOException {
        String content = "";
        String type = file.getContentType();

        if(type != null && type.equals("text/plain")) { //for Text file.
            content = new String(file.getBytes());
        } else if(type != null && type.equals("application/pdf")) { //for PDF file.
            PDDocument document = PDDocument.load(file.getInputStream());
            PDFTextStripper stripper = new PDFTextStripper();

            content = stripper.getText(document);
            document.close();
        } else if(type != null && type.equals("application/docx")) { //docx type.
            XWPFDocument doc = new XWPFDocument(file.getInputStream());
            XWPFWordExtractor extractor = new XWPFWordExtractor(doc);
            content = extractor.getText();

            extractor.close();
            doc.close();
        } else {
            throw new UnSupportedMediaException("Unsupported file type");
        }

        return geminiService.analyzeResume(content);
    }

    //saved data of analysis
    public String savedAnalysisData(Analysis analysis) {
        fileRepo.save(analysis);
        return "analysis saved successfully!";
    }
}
