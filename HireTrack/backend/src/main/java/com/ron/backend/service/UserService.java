package com.ron.backend.service;

import com.ron.backend.dto.*;
import com.ron.backend.entity.*;
import com.ron.backend.exception.DuplicateFoundException;
import com.ron.backend.exception.UserNotFoundException;
import com.ron.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ron.backend.service.analyzeService;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDataRepository userDataRepo;

    @Autowired
    private HistoryRepository historyRepo;

    @Autowired
    private analyzeService aService;

    @Autowired
    private JobMatchRepository jobMatchRepo;

    //sign-up
    public ResponseLoginDto signup(SignupReqDto dto) {
        Users user = userRepo.findByUsername(dto.getUsername());
        Users user2 = userRepo.findByEmail(dto.getEmail());

        if(user != null) {
            throw new DuplicateFoundException("Username is already taken, try alternative!");
        }

        if(user2 != null) {
            throw new DuplicateFoundException("This Email is already signed in, try alternative!");
        }

        user = new Users();
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setEmail(dto.getEmail());
        user.setDateOfJoining(LocalDate.now());
        user.setRoles(new ArrayList<>());
        user.addRole("ROLE_USER");
        userRepo.save(user);

        //now store user_data ->>
        UserData userData = new UserData();
        userData.setUser(user);
        userData.setPlan("FREE");
        userData.setRemainingLimit(5L);
        userData.setLastResetDate(LocalDate.now());
        userData.setTotalAnalysis(0L);
        userData.setAvgAtsScore(0.0);
        userData.setBlock(false);
        userDataRepo.save(userData);

        return login(new RequestLoginDto(dto.getUsername(), dto.getPassword()));
    }

    public ResponseLoginDto login(RequestLoginDto user) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            user.getPassword()
                    )
            );

            Users us = userRepo.findByUsername(user.getUsername());

            ResponseLoginDto response = new ResponseLoginDto();
            response.setId(us.getId());
            response.setUsername(us.getUsername());
            response.setEmail(us.getEmail());
            response.setDateTime(LocalDateTime.now());
            response.setBearerToken(jwtService.generateToken(user.getUsername()));

            List<AnalysisDto> list = new ArrayList<>();
            if(us.getAnalyses() != null) {
                for(Analysis analysis : us.getAnalyses()) {
                    if(analysis == null) {
                        break;
                    }

                    list.add(new AnalysisDto(analysis.getId(), analysis.getContent()));
                }
            }
            response.setAnalyses(list);

            if(!us.getRoles().isEmpty()) {
                List<String> roles = new ArrayList<>(us.getRoles());
                response.setRoles(roles);
            }

            return response;
        } catch(UserNotFoundException e) {
            throw new UserNotFoundException("User not found");
        }
    }

    public Users getUser(Long id) {
        return userRepo.findById(id).
                orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    //this will return to avoid infinite when getUser() call!
    public UserDto convertDto(Users user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());

        List<AnalysisDto> list = new ArrayList<>();
        user.getAnalyses().forEach(a -> {
            list.add(new AnalysisDto(a.getId(), a.getContent()));
        });

        userDto.setAnalyses(list);
        return userDto;
    }

    public String deleteUser(Long id) {
        userRepo.deleteById(id);
        return "user deleted successfully";
    }

    public ResponseEntity<?> getUserData() {
        Users user = userRepo.findByUsername(aService.getCurrentUser());
        //limit, totalAnalysis, avgAts, plan, history recent 4,5 history.

        UserData userData = userDataRepo.findByUserId(user.getId());
        List<JobMatchAnalysis> jobMatchList = jobMatchRepo.findAllByUser_Id(user.getId());
        aService.resetDailyLimit(userData); //reset daily limit if changed!

        Long limit = userData.getRemainingLimit();
        Long totalAnalysis = userData.getTotalAnalysis();
        Double avgAtsScore = userData.getAvgAtsScore();
        String plan = userData.getPlan();

        List<UserHistory> userRecentFiveActivities =
                historyRepo.findTop5ByUser_IdOrderByDateDesc(user.getId());

        //user other info.
        UserDataResponseDto response = new UserDataResponseDto();
        response.setPlan(plan);
        response.setTotalAnalysis(totalAnalysis);
        response.setLimit(limit);
        response.setAvgAtsScore(avgAtsScore);
        response.setIsBlock(userData.getBlock());
        response.setTotalJobMatchAnalyses(jobMatchList.size());

        //recent top 5 analysis.
        List<HistoryResponseDto> recentActivity = new ArrayList<>();
        userRecentFiveActivities.forEach(userHistory -> {
            HistoryResponseDto hDto = new HistoryResponseDto();
            hDto.setDate(userHistory.getDate());
            hDto.setFileName(userHistory.getFileName());
            hDto.setAvgAtsScore(userHistory.getAts());

            recentActivity.add(hDto);
        });

        response.setAnalysisHistory(recentActivity);
        return ResponseEntity.status(200).body(response);
    }

    public Page<HistoryResponseDto> getHistoryList(
        String keyword,
        int page,
        int size,
        Sort sort
    ) {
        Users user = userRepo.findByUsername(aService.getCurrentUser());

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<UserHistory> historyList = (keyword.isBlank()
            ? historyRepo.findAllByUser_Id(user.getId(), pageable)
            : historyRepo.findByUser_IdAndFileNameContainingIgnoreCase(user.getId(), keyword, pageable)
        );

        return (
                historyList.map(hAnalysis -> {
                    HistoryResponseDto hDto = new HistoryResponseDto();
                    hDto.setDate(hAnalysis.getDate());
                    hDto.setFileName(hAnalysis.getFileName());
                    hDto.setAvgAtsScore(hAnalysis.getAts());
                    return hDto;
                })
        );
    }
}
