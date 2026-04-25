package com.ron.backend_blog2.service;

import com.ron.backend_blog2.entity.Users;
import com.ron.backend_blog2.enums.Role;
import com.ron.backend_blog2.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    public Users userRegister(Users user) {
        Users isExist = repo.findByEmail(user.getEmail());
        if(isExist != null){
            return null;
        }

        LocalDate now = LocalDate.now();

        user.setRole(Role.USER);
        user.setJoinDate(now);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return repo.save(user);
    }

    public Users userLogin(Users user, HttpServletRequest request) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail(),
                            user.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(auth);
            request.getSession(true);

            return repo.findByEmail(user.getEmail());
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            return null;
        }
    }

    public Users getUserByEmail(String email) {
        return repo.findByEmail(email);
    }

    public void deleteUser(Long id) {
        repo.deleteById(id);
    }

    public Users getUserById(Long id) {
        Optional<Users> user = repo.findById(id);
        return user.orElse(null);
    }

    public void promoteUser(Users user) {
        repo.save(user);
    }

    public List<Users> getAllUsers() {
        return repo.findAll();
    }
}
