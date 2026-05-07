package com.ron.backend.service;

import com.ron.backend.entity.Users;
import com.ron.backend.model.UserDetailsPrinciple;
import com.ron.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepo.findByUsername(username);
        if(user == null) {
            throw new UsernameNotFoundException(username);
        }

        return new UserDetailsPrinciple(user);
    }
}
