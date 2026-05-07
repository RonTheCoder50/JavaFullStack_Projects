package com.ron.backend.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {
    public String analyzeResume(String text) {
        try {
            Client client = new Client();
            String prompt =
                    "Analyze the following resume and return ONLY valid JSON.\n\n" +

                            "Format:\n" +
                            "{\n" +
                            "  skills: [],\n" +
                            "  missing_skills: [],\n" +
                            "  ats_score: number,\n" +
                            "  summary: string,\n" +
                            "  improvements: [],\n" +
                            "  strengths: [],\n" +
                            "  weaknesses: []\n" +
                            "}\n\n" +

                            "Rules:\n" +
                            "- Do not include any extra text\n" +
                            "- Keep responses concise\n\n" +

                            "Resume:\n" + text;

            GenerateContentResponse response =
                    client.models.generateContent(
                            "gemini-3-flash-preview",
                            prompt,
                            null
                    );

            return response.text();
        } catch(Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
