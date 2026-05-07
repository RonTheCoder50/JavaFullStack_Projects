package com.ron.backend.service;

import com.ron.backend.dto.AnalysisDto;
import com.ron.backend.dto.RequestLoginDto;
import com.ron.backend.dto.ResponseLoginDto;
import com.ron.backend.dto.UserDto;
import com.ron.backend.entity.Analysis;
import com.ron.backend.entity.Users;
import com.ron.backend.exception.UserNotFoundException;
import com.ron.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    //sign-up
    public ResponseEntity<String> signup(Users user) {
        Users us = userRepo.findByUsername(user.getUsername());
        if(us != null) { //if user already? send for login!
            return ResponseEntity.status(203).body("already exists!");
        } else {
            user.setDateOfJoining(LocalDate.now());
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRoles(new ArrayList<>());
            user.addRole("ROLE_USER");
            userRepo.save(user);
            return ResponseEntity.ok("user added successfully!");
        }
    }

    public ResponseLoginDto login(RequestLoginDto user) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            user.getPassword()
                    )
            );

            System.out.println("login user authority's: " + auth.getAuthorities());

            Users us = userRepo.findByUsername(user.getUsername());

            ResponseLoginDto response = new ResponseLoginDto();
            response.setId(us.getId());
            response.setUsername(user.getUsername());
            response.setAnalyses(us.getAnalyses());
            response.setDateTime(LocalDateTime.now());
            response.setBearerToken(jwtService.generateToken(user.getUsername()));

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
        for(Analysis as : user.getAnalyses()){
            AnalysisDto aDto = new AnalysisDto();
            aDto.setId(as.getId());
            aDto.setContent(as.getContent());
            list.add(aDto);
        }

        userDto.setAnalyses(list);
        return userDto;
    }

    public String deleteUser(Long id) {
        userRepo.deleteById(id);
        return "user deleted successfully";
    }
}
