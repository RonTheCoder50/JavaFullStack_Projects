package com.ron.backend.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.ron.backend.exception.AiQuotaExceededException;
import com.ron.backend.exception.AiServiceBusyException;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {
    //resume analyzing
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
        } catch (Exception e) {
            String message = e.getMessage();

            if (message != null && message.contains("503")) {
                throw new AiServiceBusyException(
                        "AI service is experiencing high traffic."
                );
            }

            throw new RuntimeException("Unexpected AI service error", e);
        }
    }

    //Job matching using - resume + Job Description.
    public String analyzeJobMatching(String resume, String description) {
        try {
            resume = resume.substring(0, Math.min(resume.length(), 8000));
            description = description.substring(0, Math.min(description.length(), 5000));
            Client client = new Client();

            String prompt = """
                You are an ATS system.
                
                Compare the resume with the job description.
                
                Return ONLY valid JSON.
                
                {
                  "technical_match": 0,
                  "experience_match": 0,
                  "education_match": 0,
                  "overall_match": 0,
                  "top_missing_skills": []
                }
                
                Rules:
                - Scores must be integers between 0 and 100.
                - technical_match = match of technical skills.
                - experience_match = match of work experience/projects.
                - education_match = match of education requirements.
                - overall_match = overall suitability.
                - top_missing_skills = maximum 5 important missing skills.
                - Return JSON only.
                
                Resume:
                %s
                
                Job Description:
                %s
                """.formatted(resume, description);

            GenerateContentResponse response =
                    client.models.generateContent(
                            "gemini-3.1-flash-lite-preview",
                            prompt,
                            null
                    );

            return response.text();
        } catch(Exception e) {
            e.printStackTrace();
            String message  = e.getMessage();
            if (message != null && message.contains("503")) {
                throw new AiServiceBusyException("AI service is experiencing high traffic. \n" + "please try again.");
            }

            throw new RuntimeException("Unexpected AI service error", e);
        }
    }
}
