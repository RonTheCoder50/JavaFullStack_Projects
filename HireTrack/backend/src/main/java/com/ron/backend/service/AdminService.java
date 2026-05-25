package com.ron.backend.service;

import com.ron.backend.dto.AdminDataDTO;
import com.ron.backend.dto.AnalysisResponseDto;
import com.ron.backend.dto.UserInfoDto;
import com.ron.backend.entity.Analysis;
import com.ron.backend.entity.UserData;
import com.ron.backend.entity.Users;
import com.ron.backend.model.AnalysesTableDto;
import com.ron.backend.model.ChartDto;
import com.ron.backend.repository.AnalysisRepository;
import com.ron.backend.repository.UserDataRepository;
import com.ron.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.*;

@Service
public class AdminService {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private AnalysisRepository analysisRepo;

    @Autowired
    private UserDataRepository userDataRepo;

    public AdminDataDTO getAdminData() {
        Long users = totalUsers();
        Long analysis = totalAnalysis();
        Integer todayAnalysis = analysisToday();
        Double ats = avgAtsScore();

        Authentication auth = SecurityContextHolder
                .getContext()
                .getAuthentication();
        String username;
        if(auth != null) {
            username = auth.getName();
        } else {
            throw new RuntimeException("Authentication object is null");
        }

        AdminDataDTO adminDataDTO = new AdminDataDTO();
        adminDataDTO.setUsername(username);
        adminDataDTO.setTotalUsers(users);
        adminDataDTO.setTotalAnalyses(analysis);
        adminDataDTO.setTodayAnalyses(todayAnalysis);
        adminDataDTO.setAvgAtsScore(ats);
        adminDataDTO.setPlanData(
                new ArrayList<>(Arrays.asList(
                        getTotalFreePlanUsers(),
                        getTotalProPlanUsers()
                ))
        );

        adminDataDTO.setUserDataList(getAllUserInfo()); //total userinfo for admin panel.
        adminDataDTO.setAnalysesDataList(getAllAnalysesData());
        return adminDataDTO;
    }

    public Long totalUsers() {
        return userRepo.count() - 1;
    }

    public Long totalAnalysis() {
        return analysisRepo.count();
    }

    public Double avgAtsScore() {
        return analysisRepo.getAvgAtsScore();
    }

    public Integer analysisToday() {
        LocalDate today = LocalDate.now();

        LocalDateTime start = today.atStartOfDay();
        LocalDateTime end = today.plusDays(1).atStartOfDay();

        return analysisRepo.getAnalysisOfToday(start, end);
    }

    public List<ChartDto> getWeeklyCountOfUsers() {
        LocalDate today = LocalDate.now();
        List<ChartDto> countOfUsers = new ArrayList<>();

        for(int i=0; i<7; i++) {
            LocalDate date = today.minusDays(i);

            String day = date.getDayOfWeek()
                    .getDisplayName(
                            TextStyle.SHORT,
                            Locale.ENGLISH
                    );

            Long count = userRepo.getUserCountByDate(date);

            countOfUsers.add(new ChartDto(day, count));
        }

        return countOfUsers;
    }

    public List<ChartDto> getMonthlyCountOfUsers() {
         LocalDate today = LocalDate.now();
         DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d MMM");
         List<ChartDto> monthlyUserGrowthCount = new ArrayList<>(); //30 day data

         for(int i=0; i<30; i++) {
             LocalDate date = today.minusDays(i);
             String label = date.format(formatter);
             Long count = userRepo.getUserCountByDate(date);

             monthlyUserGrowthCount.add(new ChartDto(label, count));
         }

         return monthlyUserGrowthCount;
    }

    public List<ChartDto> getYearlyCountOfUsers() {
        return userRepo.getYearlyUserCountAnalysis();
    }

    public List<ChartDto> getWeeklyCountOfAnalyses() {
        LocalDate today = LocalDate.now();
        List<ChartDto> weeklyAnalysisCount = new ArrayList<>();

        for(int i=0; i<7; i++) {
            LocalDate date = today.minusDays(i);
            String day = date.getDayOfWeek()
                    .getDisplayName(
                            TextStyle.SHORT,
                            Locale.ENGLISH
                    );

            LocalDateTime start = date.atStartOfDay();
            LocalDateTime end = date.plusDays(1).atStartOfDay();

            Long data = analysisRepo.getAnalysisCountByDate(start, end);
            weeklyAnalysisCount.add(new ChartDto(day, data));
        }

        return weeklyAnalysisCount;
    }

    public List<ChartDto> getMonthlyCountOfAnalyses() {
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d MMM");
        List<ChartDto> monthlyAnalysesCount = new ArrayList<>(); //30 day data

        for(int i=0; i<30; i++) {
            LocalDate date = today.minusDays(i);
            String label = date.format(formatter);

            LocalDateTime start = date.atStartOfDay();
            LocalDateTime end = date.plusDays(1).atStartOfDay();

            Long data = analysisRepo.getAnalysisCountByDate(start, end);
            monthlyAnalysesCount.add(new ChartDto(label, data));
        }

        return monthlyAnalysesCount;
    }

    public List<ChartDto> getYearlyCountOfAnalyses() {
        return analysisRepo.getYearlyAnalysesCount();
    }

    public ChartDto getTotalFreePlanUsers() {
        Long count = userDataRepo.getCountOfFreePlanUsers();
        return new ChartDto("FREE", count);
    }

    public ChartDto getTotalProPlanUsers() {
        Long count = userDataRepo.getCountOfProPlanUsers();
        return new ChartDto("PRO", count);
    }

    public List<UserInfoDto> getAllUserInfo() {
         List<UserData> data = userDataRepo.findAll();
         List<UserInfoDto> result = new ArrayList<>();

         for(UserData userData : data) {
             Users user = userData.getUser();

             UserInfoDto userInfoDto = new UserInfoDto();
             userInfoDto.setUsername(user.getUsername());
             userInfoDto.setUserId(user.getId());

             userInfoDto.setPlan(userData.getPlan());
             userInfoDto.setDateOfJoining(user.getDateOfJoining());
             userInfoDto.setAvgAtsScore(userData.getAvgAtsScore());
             userInfoDto.setTotalAnalyses(userData.getTotalAnalysis());
             userInfoDto.setIsBlock(userData.getBlock() != null && userData.getBlock());
             userInfoDto.setRoles(user.getRoles());

             result.add(userInfoDto);
         }

         return result;
    }

    //block - unblock api
    public String toggleBlock(Long id, String username) {
        UserData userData = userDataRepo.findByUserId(id);
        if(userData.getBlock() == null || userData.getBlock()) {
            userData.setBlock(false);
            userDataRepo.save(userData);
            return "user " + username + ", id: " + id +" unblocked successfully";
        } else {
            userData.setBlock(true);
            userDataRepo.save(userData);
            return "user " + username + ", id: " + id +" blocked successfully";
        }
    }

    public String deleteUser(Long id, String username) {
        userRepo.deleteById(id);
        return "user "+ username +" deleted successfully";
    }

    public List<AnalysesTableDto> getAllAnalysesData() {
        //each user -> each analyses sent!!
        List<Users> users =  userRepo.findAll();
        List<AnalysesTableDto> result = new ArrayList<>();

        for(Users user : users) {
            List<Analysis> userAnalyses = analysisRepo.findByUser_Id(user.getId());
            for(Analysis analysis : userAnalyses) {
                AnalysesTableDto ans = new AnalysesTableDto();
                ans.setUsername(user.getUsername());

                ans.setFilename(analysis.getFilename());
                ans.setTime(analysis.getDate());
                ans.setAts(analysis.getAts());
                ans.setUid(user.getId());
                result.add(ans);
            }
        }

        return result;
    }

    public AnalysisResponseDto getAnalysis(Long userId, String filename) {
        try {
            Users user = userRepo.findById(userId)
                    .orElseThrow(() -> new RuntimeException("user not found"));
            Analysis analysis = analysisRepo.findByFilenameAndUser_Id(filename, user.getId());

            if(analysis != null) {
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
}
